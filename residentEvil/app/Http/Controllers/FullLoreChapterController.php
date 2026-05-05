<?php

namespace App\Http\Controllers;

use App\Models\FullLoreChapter;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class FullLoreChapterController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => FullLoreChapter::query()
                ->orderBy('number')
                ->get()
                ->map(fn (FullLoreChapter $chapter) => $this->formatChapter($chapter)),
        ]);
    }

    public function update(Request $request, FullLoreChapter $fullLoreChapter)
    {
        try {
            $data = $request->validate([
                'title' => 'required|string|max:255',
                'period' => 'required|string|max:255',
                'focus' => 'required|string|max:255',
                'character' => 'required|string|max:255',
                'characterRole' => 'required|string|max:255',
                'accent' => ['required', 'string', 'regex:/^#[0-9A-Fa-f]{6}$/'],
                'glow' => 'required|string|max:255',
                'surface' => 'required|string|max:255',
                'text' => 'required|array|min:1',
                'text.*' => 'required|string',
                'impact' => 'required|string',
            ]);

            $fullLoreChapter->update([
                'title' => $data['title'],
                'period' => $data['period'],
                'focus' => $data['focus'],
                'character' => $data['character'],
                'character_role' => $data['characterRole'],
                'accent' => $data['accent'],
                'glow' => $data['glow'],
                'surface' => $data['surface'],
                'text' => $data['text'],
                'impact' => $data['impact'],
            ]);

            return response()->json([
                'success' => true,
                'data' => $this->formatChapter($fullLoreChapter->fresh()),
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Dados invalidos para editar o capitulo.',
                'errors' => $e->errors(),
            ], 422);
        }
    }

    private function formatChapter(FullLoreChapter $chapter): array
    {
        return [
            'id' => $chapter->slug,
            'number' => $chapter->number,
            'title' => $chapter->title,
            'period' => $chapter->period,
            'focus' => $chapter->focus,
            'character' => $chapter->character,
            'characterRole' => $chapter->character_role,
            'accent' => $chapter->accent,
            'glow' => $chapter->glow,
            'surface' => $chapter->surface,
            'text' => $chapter->text,
            'impact' => $chapter->impact,
        ];
    }
}
