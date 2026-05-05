import React, { useEffect, useMemo, useState } from 'react';
import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import api from '../service/Api';
import styles from './GameSummariesStyle';

type GameSummary = {
    id: string;
    title: string;
    year: string;
    accent: string;
    setting: string;
    focus: string;
    summary: string;
    lore: string;
};

const fallbackAccent = '#ba181b';

const emptyForm: GameSummary = {
    id: '',
    title: '',
    year: '',
    accent: fallbackAccent,
    setting: '',
    focus: '',
    summary: '',
    lore: '',
};

function safeColor(color?: string, fallback = fallbackAccent) {
    return /^#[0-9a-fA-F]{6}$/.test(color ?? '') ? color as string : fallback;
}

function normalizeGameSummary(game: Partial<GameSummary>): GameSummary {
    return {
        id: String(game.id ?? ''),
        title: String(game.title ?? ''),
        year: String(game.year ?? ''),
        accent: safeColor(game.accent),
        setting: String(game.setting ?? ''),
        focus: String(game.focus ?? ''),
        summary: String(game.summary ?? ''),
        lore: String(game.lore ?? ''),
    };
}

export default function GameSummaries({ navigation }: any) {
    const [games, setGames] = useState<GameSummary[]>([]);
    const [selectedGameId, setSelectedGameId] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [editingGame, setEditingGame] = useState<GameSummary | null>(null);
    const [form, setForm] = useState<GameSummary>(emptyForm);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function loadGameSummaries() {
            try {
                const response = await api.get('/game-summaries');
                const gameSummaries = (response.data.data ?? []).map(normalizeGameSummary);

                setGames(gameSummaries);
                setSelectedGameId(gameSummaries[0]?.id ?? '');
            } catch (err) {
                setError('Não foi possível carregar os resumos dos jogos.');
            } finally {
                setLoading(false);
            }
        }

        loadGameSummaries();
    }, []);

    const selectedGame = useMemo(
        () => games.find((game) => game.id === selectedGameId) ?? games[0],
        [games, selectedGameId]
    );

    function openAddModal() {
        setEditingGame(null);
        setForm(emptyForm);
        setModalVisible(true);
    }

    function openEditModal(game: GameSummary) {
        setEditingGame(game);
        setForm(game);
        setModalVisible(true);
    }

    function updateField(field: keyof GameSummary, value: string) {
        setForm((current) => ({ ...current, [field]: value }));
    }

    async function saveGameSummary() {
        setSaving(true);
        setError('');

        try {
            const payload = {
                title: form.title,
                year: form.year,
                accent: safeColor(form.accent),
                setting: form.setting,
                focus: form.focus,
                summary: form.summary,
                lore: form.lore,
            };

            const response = editingGame
                ? await api.put(`/game-summaries/${editingGame.id}`, payload)
                : await api.post('/game-summaries', payload);

            const savedGame = normalizeGameSummary(response.data.data ?? {});

            if (!savedGame.id) {
                setError('O backend salvou, mas nao retornou o jogo no formato esperado.');
                return;
            }

            setGames((current) => {
                if (editingGame) {
                    return current.map((game) => (game.id === savedGame.id ? savedGame : game));
                }

                return [...current, savedGame];
            });

            setSelectedGameId(savedGame.id);
            setModalVisible(false);
        } catch (err) {
            setError('Nao foi possivel salvar a informacao.');
        } finally {
            setSaving(false);
        }
    }

    function renderSummaryModal() {
        const modalAccent = safeColor(form.accent);

        return (
            <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalBackdrop}>
                    <View style={[styles.modalCard, { borderColor: modalAccent }]}>
                        <Text style={[styles.modalTitle, { color: modalAccent }]}>
                            {editingGame ? 'EDITAR INFORMACAO' : 'ADICIONAR INFORMACAO'}
                        </Text>

                        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                            <TextInput style={styles.input} placeholder="Jogo" placeholderTextColor="#8d8080" value={form.title} onChangeText={(value) => updateField('title', value)} />
                            <TextInput style={styles.input} placeholder="Ano" placeholderTextColor="#8d8080" value={form.year} onChangeText={(value) => updateField('year', value)} />
                            <TextInput style={styles.input} placeholder="Cor accent. Ex: #ba181b" placeholderTextColor="#8d8080" value={form.accent} onChangeText={(value) => updateField('accent', value)} />
                            <TextInput style={styles.input} placeholder="Local / cenario" placeholderTextColor="#8d8080" value={form.setting} onChangeText={(value) => updateField('setting', value)} />
                            <TextInput style={styles.input} placeholder="Foco" placeholderTextColor="#8d8080" value={form.focus} onChangeText={(value) => updateField('focus', value)} />
                            <TextInput style={styles.textArea} multiline placeholder="Resumo da historia" placeholderTextColor="#8d8080" value={form.summary} onChangeText={(value) => updateField('summary', value)} />
                            <TextInput style={styles.textArea} multiline placeholder="Lore / impacto" placeholderTextColor="#8d8080" value={form.lore} onChangeText={(value) => updateField('lore', value)} />
                        </ScrollView>

                        <View style={styles.modalActions}>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.cancelButtonText}>CANCELAR</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.saveButton, { backgroundColor: modalAccent }]} onPress={saveGameSummary} disabled={saving}>
                                <Text style={styles.saveButtonText}>{saving ? 'SALVANDO...' : 'SALVAR'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }

    if (loading) {
        return (
            <View style={styles.container}>
                <View style={styles.centerState}>
                    <Text style={styles.stateText}>Carregando resumos...</Text>
                </View>
            </View>
        );
    }

    if (!selectedGame) {
        return (
            <View style={styles.container}>
                <View style={styles.centerState}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.backText}>← BACK TO HUB</Text>
                    </TouchableOpacity>
                    <Text style={styles.stateText}>{error || 'Nenhum resumo encontrado.'}</Text>
                    <TouchableOpacity style={[styles.addButton, { borderColor: '#ba181b', marginTop: 16 }]} onPress={openAddModal}>
                        <Text style={[styles.addButtonText, { color: '#ba181b' }]}>+ ADICIONAR INFORMACAO</Text>
                    </TouchableOpacity>
                </View>
                {renderSummaryModal()}
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View pointerEvents="none" style={[styles.backgroundOrb, { backgroundColor: `${safeColor(selectedGame.accent)}33` }]} />

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backText}>← BACK TO HUB</Text>
                </TouchableOpacity>

                <View style={styles.headerRow}>
                    <View style={styles.headerTextBlock}>
                        <Text style={styles.title}>GAME SUMMARIES</Text>
                        <Text style={styles.subtitle}>
                            Pick a mainline title to read a fast lore summary focused on that game alone.
                        </Text>
                    </View>

                    <TouchableOpacity style={[styles.addButton, { borderColor: safeColor(selectedGame.accent) }]} onPress={openAddModal}>
                        <Text style={[styles.addButtonText, { color: safeColor(selectedGame.accent) }]}>+ ADICIONAR INFORMACAO</Text>
                    </TouchableOpacity>
                </View>

                {error ? <Text style={styles.inlineError}>{error}</Text> : null}

                <TouchableOpacity style={[styles.editHeaderButton, { borderColor: safeColor(selectedGame.accent) }]} onPress={() => openEditModal(selectedGame)}>
                    <Text style={[styles.editHeaderText, { color: safeColor(selectedGame.accent) }]}>✎ EDITAR JOGO SELECIONADO</Text>
                </TouchableOpacity>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.selectorRow}>
                    {games.map((game) => {
                        const selected = game.id === selectedGame.id;
                        const gameAccent = safeColor(game.accent);
                        return (
                            <View
                                key={game.id}
                                style={[
                                    styles.selectorButton,
                                    selected && { backgroundColor: gameAccent, borderColor: gameAccent }
                                ]}
                            >
                                <TouchableOpacity style={styles.selectorSelectArea} onPress={() => setSelectedGameId(game.id)}>
                                    <Text style={[styles.selectorTitle, selected && styles.selectorTitleActive]}>
                                        {game.title}
                                    </Text>
                                    <Text style={[styles.selectorYear, selected && styles.selectorTitleActive]}>
                                        {game.year}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.selectorEditButton} onPress={() => openEditModal(game)}>
                                    <Text style={[styles.editIcon, selected && styles.selectorTitleActive]}>✎</Text>
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </ScrollView>

                <View style={[styles.featureCard, { borderColor: safeColor(selectedGame.accent) }]}>
                    <TouchableOpacity style={styles.cardEditButton} onPress={() => openEditModal(selectedGame)}>
                        <Text style={[styles.editIcon, { color: safeColor(selectedGame.accent) }]}>✎</Text>
                    </TouchableOpacity>
                    <Text style={[styles.featureBadge, { color: safeColor(selectedGame.accent) }]}>FOCUS FILE</Text>
                    <Text style={styles.featureTitle}>{selectedGame.title}</Text>
                    <Text style={styles.featureMeta}>{selectedGame.year} • {selectedGame.setting}</Text>
                    <Text style={styles.featureFocus}>{selectedGame.focus}</Text>
                </View>

                <View style={styles.textCard}>
                    <TouchableOpacity style={styles.cardEditButton} onPress={() => openEditModal(selectedGame)}>
                        <Text style={[styles.editIcon, { color: safeColor(selectedGame.accent) }]}>✎</Text>
                    </TouchableOpacity>
                    <Text style={styles.cardLabel}>STORY SUMMARY</Text>
                    <Text style={styles.cardText}>{selectedGame.summary}</Text>
                </View>

                <View style={styles.textCard}>
                    <TouchableOpacity style={styles.cardEditButton} onPress={() => openEditModal(selectedGame)}>
                        <Text style={[styles.editIcon, { color: safeColor(selectedGame.accent) }]}>✎</Text>
                    </TouchableOpacity>
                    <Text style={styles.cardLabel}>LORE IMPACT</Text>
                    <Text style={styles.cardText}>{selectedGame.lore}</Text>
                </View>
            </ScrollView>

            {renderSummaryModal()}
        </View>
    );
}
