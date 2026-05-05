<?php

namespace Database\Seeders;

use App\Models\FullLoreChapter;
use Illuminate\Database\Seeder;

class FullLoreChapterSeeder extends Seeder
{
    public function run(): void
    {
        $chapters = [
            [
                'slug' => 'progenitor',
                'number' => '01',
                'title' => 'A origem da obsessao',
                'period' => 'Anos 1960',
                'focus' => 'Progenitor Virus',
                'character' => 'Oswell E. Spencer',
                'character_role' => 'Fundador da Umbrella',
                'accent' => '#b9a44c',
                'glow' => 'rgba(185, 164, 76, 0.2)',
                'surface' => 'rgba(30, 26, 14, 0.96)',
                'text' => [
                    'A historia de Resident Evil comeca antes dos zumbis, antes da mansao e antes de Raccoon City. Spencer, Edward Ashford e James Marcus entram em contato com pesquisas ligadas ao virus Progenitor.',
                    'O discurso publico da futura Umbrella seria farmaceutico. Por baixo, o plano real de Spencer era usar a ciencia para selecionar, controlar e redesenhar a evolucao humana.',
                ],
                'impact' => 'Este periodo cria a raiz moral da franquia: pessoas influentes tratando a vida humana como materia-prima.',
            ],
            [
                'slug' => 'marcus',
                'number' => '02',
                'title' => 'Marcus e o T-Virus',
                'period' => 'Anos 1970 a 1998',
                'focus' => 'Umbrella Training Facility',
                'character' => 'James Marcus',
                'character_role' => 'Pesquisador traido',
                'accent' => '#6f9b59',
                'glow' => 'rgba(111, 155, 89, 0.2)',
                'surface' => 'rgba(15, 28, 17, 0.96)',
                'text' => [
                    'James Marcus aprofunda os experimentos que levam ao T-Virus. A pesquisa abre caminho para necrose, agressividade extrema, mutacoes e criacao de armas biologicas.',
                    'Quando Marcus deixa de ser conveniente, e assassinado por ordens internas. Sua morte prova que dentro da Umbrella cientistas, executivos e agentes sao descartaveis.',
                ],
                'impact' => 'A traicao contra Marcus antecipa o padrao da serie: a Umbrella sempre devora as proprias crias.',
            ],
            [
                'slug' => 'mansion',
                'number' => '03',
                'title' => 'O incidente da mansao',
                'period' => 'Julho de 1998',
                'focus' => 'Arklay Mountains',
                'character' => 'Jill Valentine e Chris Redfield',
                'character_role' => 'S.T.A.R.S. Alpha Team',
                'accent' => '#d62828',
                'glow' => 'rgba(214, 40, 40, 0.24)',
                'surface' => 'rgba(34, 13, 13, 0.96)',
                'text' => [
                    'A equipe S.T.A.R.S. investiga assassinatos nas Montanhas Arklay e acaba presa na Mansao Spencer, uma fachada para laboratorios subterraneos, cobaias e o Tyrant.',
                    'Albert Wesker revela ser agente duplo e usa seus companheiros como dados vivos de combate. Jill e Chris sobrevivem entendendo que a ameaca e uma operacao industrial.',
                ],
                'impact' => 'Aqui a serie define seu DNA: horror de sobrevivencia, conspiracao corporativa e herois comuns enfrentando sistemas gigantes.',
            ],
            [
                'slug' => 'raccoon',
                'number' => '04',
                'title' => 'Raccoon City entra em colapso',
                'period' => 'Setembro de 1998',
                'focus' => 'T-Virus outbreak',
                'character' => 'Leon, Claire, Jill e Sherry',
                'character_role' => 'Sobreviventes do desastre',
                'accent' => '#e5383b',
                'glow' => 'rgba(229, 56, 59, 0.24)',
                'surface' => 'rgba(32, 10, 12, 0.96)',
                'text' => [
                    'O surto chega a cidade inteira. Raccoon City vira um organismo morrendo: delegacia isolada, ruas tomadas, hospitais contaminados e civis esmagados pelo sigilo.',
                    'Leon chega para seu primeiro dia como policial, Claire procura Chris, Jill foge de Nemesis e William Birkin injeta o G-Virus em si mesmo.',
                ],
                'impact' => 'Raccoon City e o trauma central da saga. Quase tudo que vem depois nasce desse acontecimento.',
            ],
            [
                'slug' => 'erasure',
                'number' => '05',
                'title' => 'A cidade apagada',
                'period' => 'Fim de 1998',
                'focus' => 'Cover-up',
                'character' => 'Ada Wong e HUNK',
                'character_role' => 'Agentes do mercado sombrio',
                'accent' => '#8f2d56',
                'glow' => 'rgba(143, 45, 86, 0.22)',
                'surface' => 'rgba(30, 12, 22, 0.96)',
                'text' => [
                    'Raccoon City e destruida por ataque militar para conter a infeccao e apagar provas. A Umbrella perde reputacao, mas amostras e dados escapam.',
                    'Ada representa espionagem e informacao como moeda. HUNK representa missao acima de qualquer vida e treinamento para operar dentro do horror.',
                ],
                'impact' => 'A corporacao pode cair, mas seu conhecimento entra no mercado. A ameaca deixa de ser local.',
            ],
            [
                'slug' => 'fall-umbrella',
                'number' => '06',
                'title' => 'A queda da Umbrella',
                'period' => '1999 a 2003',
                'focus' => 'Depois de Raccoon',
                'character' => 'Claire e Chris Redfield',
                'character_role' => 'Familia contra corporacoes',
                'accent' => '#2f80ed',
                'glow' => 'rgba(47, 128, 237, 0.2)',
                'surface' => 'rgba(9, 19, 34, 0.96)',
                'text' => [
                    'Com Raccoon exposta, a Umbrella passa a ser perseguida por governos, processos e sobreviventes. Claire e Chris seguem rastros da empresa pelo mundo.',
                    'A queda institucional nao encerra a tecnologia. Virus, parasitas, cientistas, arquivos e compradores continuam circulando.',
                ],
                'impact' => 'A serie troca o terror de uma empresa unica por um ecossistema inteiro de compradores, rivais e imitadores.',
            ],
            [
                'slug' => 'plagas',
                'number' => '07',
                'title' => 'Las Plagas e controle pela fe',
                'period' => '2004',
                'focus' => 'Los Iluminados',
                'character' => 'Leon S. Kennedy',
                'character_role' => 'Agente do governo americano',
                'accent' => '#c77d28',
                'glow' => 'rgba(199, 125, 40, 0.24)',
                'surface' => 'rgba(34, 23, 10, 0.96)',
                'text' => [
                    'Leon e enviado para resgatar Ashley Graham na Espanha. Las Plagas preserva coordenacao e obediencia, mudando o horror de decomposicao para controle social.',
                    'O culto Los Iluminados mistura fe, parasita e poder politico, enquanto Ada e Wesker perseguem amostras para o mercado global.',
                ],
                'impact' => 'Resident Evil deixa claro que bioterror nao depende mais da Umbrella.',
            ],
            [
                'slug' => 'wesker-endgame',
                'number' => '08',
                'title' => 'O fim de Wesker',
                'period' => '2009',
                'focus' => 'Uroboros',
                'character' => 'Chris Redfield, Sheva Alomar e Wesker',
                'character_role' => 'BSAA contra evolucao forcada',
                'accent' => '#7fb069',
                'glow' => 'rgba(127, 176, 105, 0.22)',
                'surface' => 'rgba(13, 27, 19, 0.96)',
                'text' => [
                    'Chris e Sheva investigam bioterror na Africa e encontram conexoes entre Tricell, Progenitor e a ambicao final de Wesker.',
                    'Uroboros resume a ideologia de Wesker: algo que consome, seleciona e destroi tudo que considera fraco.',
                ],
                'impact' => 'A morte de Wesker fecha o arco classico, mas deixa o mundo contaminado por decadas de pesquisa.',
            ],
            [
                'slug' => 'global',
                'number' => '09',
                'title' => 'O planeta aprende a temer surtos',
                'period' => '2012 a 2013',
                'focus' => 'C-Virus e Neo-Umbrella',
                'character' => 'Leon, Chris, Ada, Jake e Sherry',
                'character_role' => 'Campanhas conectadas',
                'accent' => '#9d4edd',
                'glow' => 'rgba(157, 78, 221, 0.22)',
                'surface' => 'rgba(24, 12, 35, 0.96)',
                'text' => [
                    'A era do C-Virus mostra ataques coordenados, conspiracoes politicas e soldados enfrentando mutacoes em conflitos internacionais.',
                    'Jake carrega a heranca biologica de Wesker. Sherry, marcada pelo G-Virus desde crianca, trabalha para impedir novas catastrofes.',
                ],
                'impact' => 'O mundo de Resident Evil passa a viver em alerta permanente.',
            ],
            [
                'slug' => 'mold',
                'number' => '10',
                'title' => 'O mofo, memoria e familia',
                'period' => '2017',
                'focus' => 'The Mold',
                'character' => 'Ethan Winters e Eveline',
                'character_role' => 'Vitima comum contra arma afetiva',
                'accent' => '#a68a64',
                'glow' => 'rgba(166, 138, 100, 0.22)',
                'surface' => 'rgba(29, 24, 18, 0.96)',
                'text' => [
                    'Ethan procura Mia e encontra a familia Baker dominada por Eveline. O Mold fala de memoria, dependencia emocional, familia e perda de identidade.',
                    'A casa dos Baker torna o terror intimo: uma familia sequestrada por uma arma biologica que deseja amor do jeito mais destrutivo possivel.',
                ],
                'impact' => 'Resident Evil volta ao terror proximo e pessoal com uma mitologia biologica nova.',
            ],
            [
                'slug' => 'miranda',
                'number' => '11',
                'title' => 'Miranda e a falsa ressurreicao',
                'period' => '2021',
                'focus' => 'Village',
                'character' => 'Ethan, Rose e Chris',
                'character_role' => 'Sacrificio e consequencia',
                'accent' => '#d4af37',
                'glow' => 'rgba(212, 175, 55, 0.22)',
                'surface' => 'rgba(35, 29, 14, 0.96)',
                'text' => [
                    'Mother Miranda usa o Mold e a vila como laboratorio para tentar recuperar a filha perdida. Os quatro lordes representam deformacoes de desejo e obediencia.',
                    'Ethan atravessa tudo por Rose, enquanto Chris age nas sombras tentando conter Miranda com metodos cada vez mais duros.',
                ],
                'impact' => 'Village encerra a saga Winters com tom tragico: sobreviver nem sempre significa sair inteiro.',
            ],
            [
                'slug' => 'requiem',
                'number' => '12',
                'title' => 'Requiem e a nova era',
                'period' => '2026',
                'focus' => 'Resident Evil Requiem',
                'character' => 'Grace Ashcroft',
                'character_role' => 'Nova protagonista da linha principal',
                'accent' => '#f5f0e6',
                'glow' => 'rgba(245, 240, 230, 0.2)',
                'surface' => 'rgba(24, 24, 24, 0.96)',
                'text' => [
                    'Resident Evil Requiem marca a nona entrada principal e abre uma nova fase de survival horror, preservando medo, acao e imersao como pilares centrais.',
                    'Como ponto atual da linha principal, Requiem funciona como memoria e funeral para mortes, cidades apagadas e pesquisas que nunca deveriam ter existido.',
                ],
                'impact' => 'A serie chega aos dias atuais perguntando quem paga o preco quando alguem tenta dominar a vida.',
            ],
        ];

        foreach ($chapters as $chapter) {
            FullLoreChapter::updateOrCreate(
                ['slug' => $chapter['slug']],
                $chapter
            );
        }
    }
}
