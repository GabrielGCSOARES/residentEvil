<?php

namespace Database\Seeders;

use App\Models\GameSummary;
use Illuminate\Database\Seeder;

class GameSummarySeeder extends Seeder
{
    public function run(): void
    {
        $games = [
            [
                'slug' => 're1',
                'title' => 'Resident Evil',
                'year' => '1996',
                'accent' => '#9d0208',
                'setting' => 'Arklay Mountains, Spencer Mansion',
                'focus' => "S.T.A.R.S. uncovers Umbrella experiments and Wesker's betrayal.",
                'summary' => "Chris Redfield and Jill Valentine investigate a string of murders and end up trapped inside the Spencer Mansion. What begins as a rescue mission becomes a fight against zombies, Hunters, the Tyrant project and Umbrella's hidden laboratory.",
                'lore' => 'The first game establishes Umbrella as a pharmaceutical giant hiding illegal bio-weapon research. It also positions Albert Wesker as a double agent whose betrayal shapes the entire franchise.',
            ],
            [
                'slug' => 're2',
                'title' => 'Resident Evil 2',
                'year' => '1998',
                'accent' => '#ba181b',
                'setting' => 'Raccoon City',
                'focus' => 'Leon and Claire survive the city collapse while the G-Virus spreads.',
                'summary' => "Leon S. Kennedy arrives for his first day as a police officer just as Raccoon City falls. Claire Redfield searches for her brother, and both are pulled into Umbrella's underground labs, William Birkin's mutations and the government cover-up.",
                'lore' => "Resident Evil 2 is the emotional center of the Raccoon City era. It shows the human cost of Umbrella's ambition and turns Leon, Claire, Ada and Sherry into key figures for future storylines.",
            ],
            [
                'slug' => 're3',
                'title' => 'Resident Evil 3: Nemesis',
                'year' => '1999',
                'accent' => '#6a040f',
                'setting' => 'Raccoon City during final collapse',
                'focus' => 'Jill escapes a city marked for erasure while Nemesis hunts S.T.A.R.S.',
                'summary' => "Jill Valentine tries to escape the ruins of Raccoon City while Nemesis relentlessly tracks her. The story emphasizes panic, military failure and Umbrella's willingness to sacrifice entire populations to bury its crimes.",
                'lore' => 'RE3 deepens the consequences of the outbreak and turns Nemesis into the clearest symbol of Umbrella weaponizing fear itself. It also leads directly into the city\'s destruction by missile strike.',
            ],
            [
                'slug' => 're4',
                'title' => 'Resident Evil 4',
                'year' => '2005',
                'accent' => '#8d0801',
                'setting' => 'Rural Spain',
                'focus' => 'Leon faces Las Plagas and a cult tied to a new form of biological control.',
                'summary' => "Now a government agent, Leon is sent to rescue Ashley Graham, the president's daughter. The mission reveals Los Iluminados, the Las Plagas parasite and a new era where infection means obedience rather than mindless decay.",
                'lore' => "RE4 widens the franchise beyond Umbrella's direct collapse and shows how bio-organic terror evolves. Ada, Wesker and the Plaga samples connect this story to the larger global black market.",
            ],
            [
                'slug' => 're5',
                'title' => 'Resident Evil 5',
                'year' => '2009',
                'accent' => '#a4161a',
                'setting' => 'Kijuju, Africa',
                'focus' => "Chris and Sheva confront Tricell, Uroboros and Wesker's endgame.",
                'summary' => "Chris Redfield and Sheva Alomar investigate a bio-terror threat in Africa and uncover connections between Umbrella's founders, the Progenitor virus and Wesker's plan to force humanity into selective evolution.",
                'lore' => "This game resolves years of Wesker-centric plotlines and reveals how deeply the franchise's origins are tied to colonial exploitation, corporate research and the Progenitor flower.",
            ],
            [
                'slug' => 're6',
                'title' => 'Resident Evil 6',
                'year' => '2012',
                'accent' => '#660708',
                'setting' => 'Global outbreaks',
                'focus' => 'Multiple campaigns show the world living in the age of open bio-terror.',
                'summary' => 'Leon, Chris, Jake and Ada move through linked crises involving the C-Virus, Neo-Umbrella and worldwide attacks. The scale is much larger, with governments, soldiers and civilians all pulled into overlapping disasters.',
                'lore' => 'RE6 proves the biohazard problem is no longer local. By this point the franchise becomes a global conflict where old Umbrella secrets fuel new extremist and corporate agendas.',
            ],
            [
                'slug' => 're7',
                'title' => 'Resident Evil 7: Biohazard',
                'year' => '2017',
                'accent' => '#7f5539',
                'setting' => 'Dulvey, Louisiana',
                'focus' => 'Ethan Winters enters the Baker estate and uncovers the Mold.',
                'summary' => 'Ethan searches for his missing wife Mia and finds the Baker family under the influence of Eveline, a bioweapon linked to a sentient fungal network. The horror returns to an intimate, claustrophobic scale.',
                'lore' => 'RE7 refreshes the series by introducing the Mold, a new biological threat that stores memory and identity. It starts the Winters family arc and links classic biohazard themes to a new mythology.',
            ],
            [
                'slug' => 're8',
                'title' => 'Resident Evil Village',
                'year' => '2021',
                'accent' => '#9c6644',
                'setting' => 'Remote European village',
                'focus' => 'Ethan faces Miranda, the four lords and the true depth of the Mold.',
                'summary' => "After Chris Redfield disrupts Ethan's life, Ethan is dragged into a frozen village ruled by Mother Miranda and her lieutenants. The search for Rose becomes a revelation about identity, sacrifice and the origins of Miranda's obsession.",
                'lore' => "Village ties the Winters story back into decades of experimentation, false resurrection and bioweapon manipulation. It also reframes Ethan as one of the series' most tragic protagonists.",
            ],
        ];

        foreach ($games as $game) {
            GameSummary::updateOrCreate(
                ['slug' => $game['slug']],
                $game
            );
        }
    }
}
