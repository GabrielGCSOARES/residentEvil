import React, { useEffect, useState } from 'react';
import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import api from '../service/Api';
import styles from './FullLoreStyle';

type LoreChapter = {
    id: string;
    number: string;
    title: string;
    period: string;
    focus: string;
    character: string;
    characterRole: string;
    accent: string;
    glow: string;
    surface: string;
    text: string[];
    impact: string;
};

const fallbackLoreAccent = '#e5383b';

function safeLoreColor(color?: string, fallback = fallbackLoreAccent) {
    return /^#[0-9a-fA-F]{6}$/.test(color ?? '') ? color as string : fallback;
}

function normalizeLoreChapter(chapter: Partial<LoreChapter>): LoreChapter {
    const text = Array.isArray(chapter.text) ? chapter.text.map(String) : [String(chapter.text ?? '')].filter(Boolean);

    return {
        id: String(chapter.id ?? ''),
        number: String(chapter.number ?? ''),
        title: String(chapter.title ?? ''),
        period: String(chapter.period ?? ''),
        focus: String(chapter.focus ?? ''),
        character: String(chapter.character ?? ''),
        characterRole: String(chapter.characterRole ?? ''),
        accent: safeLoreColor(chapter.accent),
        glow: String(chapter.glow ?? 'rgba(229, 56, 59, 0.22)'),
        surface: String(chapter.surface ?? 'rgba(24, 24, 24, 0.96)'),
        text,
        impact: String(chapter.impact ?? ''),
    };
}

const loreChapters: LoreChapter[] = [
    {
        id: 'progenitor',
        number: '01',
        title: 'A origem da obsessao',
        period: 'Anos 1960',
        focus: 'Progenitor Virus',
        character: 'Oswell E. Spencer',
        characterRole: 'Fundador da Umbrella',
        accent: '#b9a44c',
        glow: 'rgba(185, 164, 76, 0.2)',
        surface: 'rgba(30, 26, 14, 0.96)',
        text: [
            'A historia de Resident Evil comeca antes dos zumbis, antes da mansao e antes de Raccoon City. Spencer, Edward Ashford e James Marcus entram em contato com pesquisas ligadas ao virus Progenitor, uma descoberta biologica rara que poderia alterar organismos vivos em uma escala impossivel para a medicina comum.',
            'O discurso publico da futura Umbrella seria farmaceutico, limpo e corporativo. Por baixo, o plano real de Spencer era muito mais frio: usar a ciencia para selecionar, controlar e redesenhar a evolucao humana. A corporacao nasce como fachada para um projeto de poder.'
        ],
        impact: 'Este periodo cria a raiz moral da franquia: pessoas ricas e influentes tratando a vida humana como materia-prima.'
    },
    {
        id: 'marcus',
        number: '02',
        title: 'Marcus e o T-Virus',
        period: 'Anos 1970 a 1998',
        focus: 'Umbrella Training Facility',
        character: 'James Marcus',
        characterRole: 'Pesquisador traido',
        accent: '#6f9b59',
        glow: 'rgba(111, 155, 89, 0.2)',
        surface: 'rgba(15, 28, 17, 0.96)',
        text: [
            'James Marcus aprofunda os experimentos que levam ao T-Virus. A pesquisa abre caminho para necrose, agressividade extrema, mutacoes e criacao de armas biologicas. O problema e que a Umbrella nao quer apenas entender o virus; ela quer transformar cada resultado em produto militar.',
            'Quando Marcus deixa de ser conveniente, e assassinado por ordens internas. Sua morte nao encerra a pesquisa. Pelo contrario: ela prova que dentro da Umbrella cientistas, executivos e agentes sao descartaveis quando atrapalham a escalada da empresa.'
        ],
        impact: 'A traicao contra Marcus antecipa o padrao da serie: a Umbrella sempre devora as proprias crias.'
    },
    {
        id: 'mansion',
        number: '03',
        title: 'O incidente da mansao',
        period: 'Julho de 1998',
        focus: 'Arklay Mountains',
        character: 'Jill Valentine e Chris Redfield',
        characterRole: 'S.T.A.R.S. Alpha Team',
        accent: '#d62828',
        glow: 'rgba(214, 40, 40, 0.24)',
        surface: 'rgba(34, 13, 13, 0.96)',
        text: [
            'A equipe S.T.A.R.S. investiga assassinatos bizarros nas Montanhas Arklay e acaba presa na Mansao Spencer. O lugar parece uma residencia aristocratica, mas funciona como mascara para laboratorios subterraneos, cobaias humanas, Hunters, Cerberus, zumbis e o Tyrant.',
            'Albert Wesker, capitao da equipe, revela ser agente duplo. Ele usa seus companheiros como dados vivos de combate para avaliar armas biologicas. Jill e Chris sobrevivem, mas saem entendendo que a ameaca nao e um acidente isolado: e uma operacao industrial.'
        ],
        impact: 'Aqui a serie define seu DNA: horror de sobrevivencia, conspiracao corporativa e herois comuns enfrentando sistemas gigantes.'
    },
    {
        id: 'raccoon',
        number: '04',
        title: 'Raccoon City entra em colapso',
        period: 'Setembro de 1998',
        focus: 'T-Virus outbreak',
        character: 'Leon, Claire, Jill e Sherry',
        characterRole: 'Sobreviventes do desastre',
        accent: '#e5383b',
        glow: 'rgba(229, 56, 59, 0.24)',
        surface: 'rgba(32, 10, 12, 0.96)',
        text: [
            'O surto chega a cidade inteira. Raccoon City vira um organismo morrendo: delegacia isolada, ruas tomadas, hospitais contaminados, esgoto ligado a laboratorios e civis sendo esmagados entre monstros e sigilo governamental.',
            'Leon S. Kennedy chega para seu primeiro dia como policial. Claire Redfield procura Chris. Jill tenta fugir enquanto Nemesis caca membros dos S.T.A.R.S. William Birkin, ferido e desesperado, injeta o G-Virus em si mesmo e transforma sua propria familia no centro emocional do desastre.'
        ],
        impact: 'Raccoon City e o trauma central da saga. Quase tudo que vem depois nasce da tentativa de explorar, esconder ou vingar esse acontecimento.'
    },
    {
        id: 'erasure',
        number: '05',
        title: 'A cidade apagada',
        period: 'Fim de 1998',
        focus: 'Cover-up',
        character: 'Ada Wong e HUNK',
        characterRole: 'Agentes do mercado sombrio',
        accent: '#8f2d56',
        glow: 'rgba(143, 45, 86, 0.22)',
        surface: 'rgba(30, 12, 22, 0.96)',
        text: [
            'Raccoon City e destruida por ataque militar para conter a infeccao e apagar provas. A justificativa e sanitizar a crise; a consequencia real e uma sepultura em massa. A Umbrella perde reputacao, mas amostras, dados e segredos escapam.',
            'Ada representa o lado espionagem da franquia: lealdades movedicas, amostras roubadas e informacao como moeda. HUNK representa o outro extremo: profissionalismo frio, missao acima de qualquer vida e a prova de que a Umbrella treinou pessoas para operar dentro do horror.'
        ],
        impact: 'A corporacao pode cair, mas seu conhecimento entra no mercado. A ameaca deixa de ser local.'
    },
    {
        id: 'fall-umbrella',
        number: '06',
        title: 'A queda da Umbrella',
        period: '1999 a 2003',
        focus: 'Depois de Raccoon',
        character: 'Claire e Chris Redfield',
        characterRole: 'Familia contra corporacoes',
        accent: '#2f80ed',
        glow: 'rgba(47, 128, 237, 0.2)',
        surface: 'rgba(9, 19, 34, 0.96)',
        text: [
            'Com Raccoon City exposta, a Umbrella passa a ser perseguida por governos, processos e sobreviventes. Claire segue rastros do irmao, Chris continua a lutar contra a estrutura da empresa e novos laboratorios revelam que a corporacao espalhou seus tentaculos pelo mundo.',
            'O ponto importante e que a queda institucional da Umbrella nao significa fim da tecnologia. O nome fica toxico, mas virus, parasitas, cientistas, arquivos e compradores continuam circulando. O mundo aprende que bioterrorismo pode ser comprado.'
        ],
        impact: 'A serie troca o terror de uma empresa unica por um ecossistema inteiro de compradores, rivais e imitadores.'
    },
    {
        id: 'plagas',
        number: '07',
        title: 'Las Plagas e controle pela fe',
        period: '2004',
        focus: 'Los Iluminados',
        character: 'Leon S. Kennedy',
        characterRole: 'Agente do governo americano',
        accent: '#c77d28',
        glow: 'rgba(199, 125, 40, 0.24)',
        surface: 'rgba(34, 23, 10, 0.96)',
        text: [
            'Leon e enviado para resgatar Ashley Graham em uma regiao rural da Espanha. A infeccao agora nao cria apenas mortos-vivos: Las Plagas preserva parte da coordenacao, da fala e da obediencia. O horror muda de decomposicao para controle social.',
            'O culto Los Iluminados mistura fe, parasita e poder politico. Ada e Wesker perseguem amostras, mostrando que o colapso da Umbrella abriu uma corrida armamentista biologica. Cada monstro vencido por Leon tambem e uma pista de que o mercado global esta se reorganizando.'
        ],
        impact: 'Resident Evil deixa claro que bioterror nao depende mais da Umbrella. Qualquer grupo com recursos pode fabricar seu proprio inferno.'
    },
    {
        id: 'wesker-endgame',
        number: '08',
        title: 'O fim de Wesker',
        period: '2009',
        focus: 'Uroboros',
        character: 'Chris Redfield, Sheva Alomar e Wesker',
        characterRole: 'BSAA contra evolucao forcada',
        accent: '#7fb069',
        glow: 'rgba(127, 176, 105, 0.22)',
        surface: 'rgba(13, 27, 19, 0.96)',
        text: [
            'Chris e Sheva investigam bioterror na Africa e encontram conexoes entre Tricell, a origem do Progenitor e a ambicao final de Wesker. Ele nao quer apenas vender armas biologicas; quer decidir quem merece sobreviver a uma nova etapa da evolucao.',
            'Uroboros e o resumo visual da ideologia de Wesker: algo que consome, seleciona e destroi tudo que considera fraco. A luta final encerra uma linha iniciada na Mansao Spencer, mas nao apaga a estrutura que tornou Wesker possivel.'
        ],
        impact: 'A morte de Wesker fecha o arco classico da serie, mas deixa o mundo ja contaminado por decadas de pesquisa.'
    },
    {
        id: 'global',
        number: '09',
        title: 'O planeta aprende a temer surtos',
        period: '2012 a 2013',
        focus: 'C-Virus e Neo-Umbrella',
        character: 'Leon, Chris, Ada, Jake e Sherry',
        characterRole: 'Campanhas conectadas',
        accent: '#9d4edd',
        glow: 'rgba(157, 78, 221, 0.22)',
        surface: 'rgba(24, 12, 35, 0.96)',
        text: [
            'A era do C-Virus mostra a franquia em escala global: ataques coordenados, cidades estrangeiras, conspiracoes politicas e soldados enfrentando mutacoes como parte de conflitos internacionais. O horror ja nao cabe em uma mansao, cidade ou vila.',
            'Jake Muller carrega a heranca biologica de Wesker. Sherry Birkin, marcada pelo G-Virus desde crianca, trabalha para impedir novas catastrofes. A serie coloca filhos, sobreviventes e clones simbolicos lidando com crimes que vieram antes deles.'
        ],
        impact: 'O mundo de Resident Evil passa a viver em alerta permanente. Bioterror vira uma realidade geopolitica.'
    },
    {
        id: 'mold',
        number: '10',
        title: 'O mofo, memoria e familia',
        period: '2017',
        focus: 'The Mold',
        character: 'Ethan Winters e Eveline',
        characterRole: 'Vitima comum contra arma afetiva',
        accent: '#a68a64',
        glow: 'rgba(166, 138, 100, 0.22)',
        surface: 'rgba(29, 24, 18, 0.96)',
        text: [
            'Ethan Winters procura Mia e encontra a familia Baker dominada por Eveline. O Mold muda a linguagem do horror: nao e apenas infeccao fisica, mas memoria, dependencia emocional, imitacao de familia e perda de identidade.',
            'A casa dos Baker parece pequena perto de Raccoon City, mas sua intimidade torna tudo mais cruel. Cada corredor mostra uma familia sequestrada por uma arma biologica que deseja amor do jeito mais destrutivo possivel.'
        ],
        impact: 'Resident Evil volta ao terror proximo e pessoal, mas com uma mitologia biologica nova.'
    },
    {
        id: 'miranda',
        number: '11',
        title: 'Miranda e a falsa ressurreicao',
        period: '2021',
        focus: 'Village',
        character: 'Ethan, Rose e Chris',
        characterRole: 'Sacrificio e consequencia',
        accent: '#d4af37',
        glow: 'rgba(212, 175, 55, 0.22)',
        surface: 'rgba(35, 29, 14, 0.96)',
        text: [
            'Mother Miranda usa o Mold e a vila como laboratorio para tentar recuperar a filha perdida. Os quatro lordes representam experimentos, deformacoes de desejo e obediencia. Ethan atravessa tudo porque sua historia sempre foi menos sobre poder e mais sobre amor persistente.',
            'Chris age nas sombras tentando conter Miranda, mas tambem mostra como os veteranos da serie carregam metodos cada vez mais duros. Rose vira a ponte entre trauma familiar, arma biologica e futuro incerto.'
        ],
        impact: 'Village encerra a saga Winters com tom tragico: sobreviver nem sempre significa sair inteiro.'
    },
    {
        id: 'requiem',
        number: '12',
        title: 'Requiem e a nova era',
        period: '2026',
        focus: 'Resident Evil Requiem',
        character: 'Grace Ashcroft',
        characterRole: 'Nova protagonista da linha principal',
        accent: '#f5f0e6',
        glow: 'rgba(245, 240, 230, 0.2)',
        surface: 'rgba(24, 24, 24, 0.96)',
        text: [
            'Resident Evil Requiem marca a nona entrada principal e abre uma nova fase de survival horror. A Capcom apresentou o jogo como uma evolucao cinematografica da serie, preservando medo, acao e imersao como pilares centrais.',
            'Como ponto atual da linha principal, Requiem funciona como memoria e funeral: a franquia olha para as mortes, cidades apagadas, familias quebradas e pesquisas que nunca deveriam ter existido, enquanto passa a tocha para novos rostos e novas consequencias.'
        ],
        impact: 'A serie chega aos dias atuais carregando a mesma pergunta desde Spencer: quem paga o preco quando alguem tenta dominar a vida?'
    }
];

const finalNotes = [
    'Umbrella criou o metodo: ciencia vendida como progresso e usada como controle.',
    'Raccoon City criou o trauma publico: sobreviventes, provas apagadas e governos envolvidos.',
    'O mercado negro criou a continuidade: mesmo sem a Umbrella original, a tecnologia continuou viva.',
    'Os protagonistas carregam cicatrizes diferentes: Jill e Chris pela traicao, Leon pela culpa, Claire pela protecao, Ethan pela familia.',
];

type LoreForm = Omit<LoreChapter, 'text'> & {
    text: string;
};

function chapterToForm(chapter: LoreChapter): LoreForm {
    return {
        ...chapter,
        text: chapter.text.join('\n\n'),
    };
}

export default function FullLore({ navigation }: any) {
    const [chapters, setChapters] = useState<LoreChapter[]>(loreChapters);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [editingChapter, setEditingChapter] = useState<LoreChapter | null>(null);
    const [form, setForm] = useState<LoreForm>(chapterToForm(loreChapters[0]));
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function loadLore() {
            try {
                const response = await api.get('/full-lore-chapters');
                const loreData = (response.data.data ?? []).map(normalizeLoreChapter);

                if (loreData.length) {
                    setChapters(loreData);
                }
            } catch (err) {
                setError('Nao foi possivel carregar a lore do backend. Mostrando conteudo local.');
            } finally {
                setLoading(false);
            }
        }

        loadLore();
    }, []);

    function openEditModal(chapter: LoreChapter) {
        setEditingChapter(chapter);
        setForm(chapterToForm(normalizeLoreChapter(chapter)));
        setModalVisible(true);
    }

    function updateField(field: keyof LoreForm, value: string) {
        setForm((current) => ({ ...current, [field]: value }));
    }

    async function saveChapter() {
        if (!editingChapter) return;

        setSaving(true);
        setError('');

        try {
            const payload = {
                title: form.title,
                period: form.period,
                focus: form.focus,
                character: form.character,
                characterRole: form.characterRole,
                accent: safeLoreColor(form.accent),
                glow: form.glow,
                surface: form.surface,
                text: form.text.split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean),
                impact: form.impact,
            };

            const response = await api.put(`/full-lore-chapters/${editingChapter.id}`, payload);
            const savedChapter = normalizeLoreChapter(response.data.data ?? {});

            setChapters((current) => current.map((chapter) => (
                chapter.id === savedChapter.id ? savedChapter : chapter
            )));
            setModalVisible(false);
        } catch (err) {
            setError('Nao foi possivel salvar este capitulo.');
        } finally {
            setSaving(false);
        }
    }

    return (
        <View style={styles.container}>
            <View pointerEvents="none" style={styles.deepVeil} />

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.contentContainer}
                scrollEnabled
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled
                keyboardShouldPersistTaps="handled"
            >
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backText}>← BACK TO HUB</Text>
                </TouchableOpacity>

                <View style={styles.headerBlock}>
                    <Text style={styles.kicker}>CHRONOLOGY FILE</Text>
                    <Text style={styles.title}>FULL LORE</Text>
                    <Text style={styles.subtitle}>
                        A historia principal de Resident Evil organizada de cima para baixo, dos primeiros experimentos ao periodo atual da franquia.
                    </Text>
                </View>

                {loading ? <Text style={styles.stateText}>Carregando lore do backend...</Text> : null}
                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                {chapters.map((chapter) => (
                    (() => {
                        const chapterAccent = safeLoreColor(chapter.accent);

                        return (
                    <View
                        key={chapter.id}
                        style={[
                            styles.chapterCard,
                            {
                                backgroundColor: chapter.surface,
                                borderColor: chapterAccent,
                                shadowColor: chapterAccent,
                            },
                        ]}
                    >
                        <View style={[styles.chapterGlow, { backgroundColor: chapter.glow }]} />
                        <TouchableOpacity style={styles.floatingEditButton} onPress={() => openEditModal(chapter)}>
                            <Text style={[styles.editIcon, { color: chapterAccent }]}>✎</Text>
                        </TouchableOpacity>

                        <View style={styles.chapterTop}>
                            <View style={[styles.chapterNumberBox, { borderColor: chapterAccent }]}>
                                <Text style={[styles.chapterNumber, { color: chapterAccent }]}>{chapter.number}</Text>
                            </View>

                            <View style={styles.chapterHeading}>
                                <Text style={[styles.period, { color: chapterAccent }]}>{chapter.period}</Text>
                                <Text style={styles.chapterTitle}>{chapter.title}</Text>
                                <Text style={styles.focusText}>{chapter.focus}</Text>
                            </View>
                        </View>

                        <View style={[styles.characterStrip, { borderColor: chapterAccent }]}>
                            <TouchableOpacity style={styles.boxEditButton} onPress={() => openEditModal(chapter)}>
                                <Text style={[styles.editIconSmall, { color: chapterAccent }]}>✎</Text>
                            </TouchableOpacity>
                            <Text style={styles.characterLabel}>PERSONAGEM / FORCA EM FOCO</Text>
                            <Text style={styles.characterName}>{chapter.character}</Text>
                            <Text style={[styles.characterRole, { color: chapterAccent }]}>{chapter.characterRole}</Text>
                        </View>

                        <View style={styles.storyBox}>
                            <TouchableOpacity style={styles.boxEditButton} onPress={() => openEditModal(chapter)}>
                                <Text style={[styles.editIconSmall, { color: chapterAccent }]}>✎</Text>
                            </TouchableOpacity>
                            {chapter.text.map((paragraph) => (
                                <Text key={paragraph} style={styles.storyText}>
                                    {paragraph}
                                </Text>
                            ))}
                        </View>

                        <View style={[styles.impactBox, { borderLeftColor: chapterAccent }]}>
                            <TouchableOpacity style={styles.boxEditButton} onPress={() => openEditModal(chapter)}>
                                <Text style={[styles.editIconSmall, { color: chapterAccent }]}>✎</Text>
                            </TouchableOpacity>
                            <Text style={styles.impactLabel}>IMPACTO NA LINHA DO TEMPO</Text>
                            <Text style={styles.impactText}>{chapter.impact}</Text>
                        </View>
                    </View>
                        );
                    })()
                ))}

                <View style={styles.finalCard}>
                    <Text style={styles.finalTitle}>O fio que une tudo</Text>
                    {finalNotes.map((note) => (
                        <Text key={note} style={styles.finalItem}>
                            {'>'} {note}
                        </Text>
                    ))}
                </View>
            </ScrollView>

            <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalBackdrop}>
                    <View style={[styles.modalCard, { borderColor: safeLoreColor(form.accent) }]}>
                        <Text style={[styles.modalTitle, { color: safeLoreColor(form.accent) }]}>EDITAR CAPITULO DA LORE</Text>

                        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                            <TextInput style={styles.input} placeholder="Titulo" placeholderTextColor="#8d8080" value={form.title} onChangeText={(value) => updateField('title', value)} />
                            <TextInput style={styles.input} placeholder="Periodo" placeholderTextColor="#8d8080" value={form.period} onChangeText={(value) => updateField('period', value)} />
                            <TextInput style={styles.input} placeholder="Foco" placeholderTextColor="#8d8080" value={form.focus} onChangeText={(value) => updateField('focus', value)} />
                            <TextInput style={styles.input} placeholder="Personagem / forca" placeholderTextColor="#8d8080" value={form.character} onChangeText={(value) => updateField('character', value)} />
                            <TextInput style={styles.input} placeholder="Papel do personagem" placeholderTextColor="#8d8080" value={form.characterRole} onChangeText={(value) => updateField('characterRole', value)} />
                            <TextInput style={styles.input} placeholder="Cor accent. Ex: #e5383b" placeholderTextColor="#8d8080" value={form.accent} onChangeText={(value) => updateField('accent', value)} />
                            <TextInput style={styles.textArea} multiline placeholder="Texto completo. Separe paragrafos com linha em branco." placeholderTextColor="#8d8080" value={form.text} onChangeText={(value) => updateField('text', value)} />
                            <TextInput style={styles.textArea} multiline placeholder="Impacto na linha do tempo" placeholderTextColor="#8d8080" value={form.impact} onChangeText={(value) => updateField('impact', value)} />
                        </ScrollView>

                        <View style={styles.modalActions}>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.cancelButtonText}>CANCELAR</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.saveButton, { backgroundColor: safeLoreColor(form.accent) }]} onPress={saveChapter} disabled={saving}>
                                <Text style={styles.saveButtonText}>{saving ? 'SALVANDO...' : 'SALVAR'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
