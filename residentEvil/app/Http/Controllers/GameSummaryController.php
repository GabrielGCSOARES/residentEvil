<?php

namespace App\Http\Controllers;

use App\Models\GameSummary;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;

class GameSummaryController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => GameSummary::query()
                ->orderBy('year')
                ->get()
                ->map(fn (GameSummary $game) => $this->formatGame($game)),
        ]);
    }

    public function store(Request $request)
    {
        try {
            $data = $this->validatedData($request);
            $data['slug'] = $this->uniqueSlug($data['title']);

            $game = GameSummary::create($data);

            return response()->json([
                'success' => true,
                'data' => $this->formatGame($game),
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Dados invalidos para criar o jogo.',
                'errors' => $e->errors(),
            ], 422);
        }
    }

    public function update(Request $request, GameSummary $gameSummary)
    {
        try {
            $data = $this->validatedData($request);
            $gameSummary->update($data);

            return response()->json([
                'success' => true,
                'data' => $this->formatGame($gameSummary->fresh()),
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Dados invalidos para editar o jogo.',
                'errors' => $e->errors(),
            ], 422);
        }
    }

    private function validatedData(Request $request): array
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'year' => 'nullable|string|max:4',
            'accent' => ['nullable', 'string', 'regex:/^#[0-9A-Fa-f]{6}$/'],
            'setting' => 'nullable|string|max:255',
            'focus' => 'nullable|string',
            'summary' => 'nullable|string',
            'lore' => 'required|string',
        ]);

        return [
            'title' => $data['title'],
            'year' => $data['year'] ?? '----',
            'accent' => $data['accent'] ?? '#ba181b',
            'setting' => $data['setting'] ?? 'Nao informado',
            'focus' => $data['focus'] ?? 'Lore adicionada pelo usuario.',
            'summary' => $data['summary'] ?? $data['lore'],
            'lore' => $data['lore'],
        ];
    }

    private function uniqueSlug(string $title): string
    {
        $baseSlug = Str::slug($title);
        $slug = $baseSlug;
        $index = 2;

        while (GameSummary::where('slug', $slug)->exists()) {
            $slug = "{$baseSlug}-{$index}";
            $index++;
        }

        return $slug;
    }

    private function formatGame(GameSummary $game): array
    {
        return [
            'id' => $game->slug,
            'title' => $game->title,
            'year' => $game->year,
            'accent' => $game->accent,
            'setting' => $game->setting,
            'focus' => $game->focus,
            'summary' => $game->summary,
            'lore' => $game->lore,
        ];
    }
}
