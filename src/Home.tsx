import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown } from "lucide-react";

interface Objection {
  id: number;
  title: string;
  responses: string[];
}

interface Feedback {
  objectionId: number;
  responseIndex: number;
  type: "positive" | "negative";
}

const objections: Objection[] = [
  {
    id: 1,
    title: "Preço alto",
    responses: [
      "Entendo, mas nosso serviço oferece benefícios exclusivos que compensam o valor.",
      "Você está investindo em segurança e tranquilidade para sua família.",
      "Temos opções flexíveis para caber no seu orçamento.",
    ],
  },
  {
    id: 2,
    title: "Não confio em seguros",
    responses: [
      "Confiança se constrói com transparência. Podemos te mostrar todos os detalhes.",
      "Nossa empresa tem anos de experiência e milhares de clientes satisfeitos.",
      "Você pode cancelar a qualquer momento se não estiver satisfeito.",
    ],
  },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedObjection, setSelectedObjection] = useState<Objection | null>(null);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [showPanel, setShowPanel] = useState(true);

  const filtered = objections.filter((obj) =>
    obj.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleFeedback = useCallback(
    (objectionId: number, responseIndex: number, type: "positive" | "negative") => {
      setFeedbacks((prev) => [...prev, { objectionId, responseIndex, type }]);
    },
    []
  );

  const getMostClicked = () => {
    if (feedbacks.length === 0) return null;
    const countMap: Record<number, number> = {};
    feedbacks.forEach((f) => {
      countMap[f.objectionId] = (countMap[f.objectionId] || 0) + 1;
    });
    const mostClickedId = Object.entries(countMap).reduce((a, b) =>
      a[1] > b[1] ? a : b
    )[0];
    return objections.find((o) => o.id === Number(mostClickedId))?.title;
  };

  return (
    <div className="min-h-screen p-4 max-w-screen-xl mx-auto space-y-6 overflow-x-hidden">
      {/* Header com estatísticas */}
      <div className="flex flex-col lg:flex-row lg:justify-between gap-4 items-start lg:items-center bg-white p-4 rounded-xl shadow">
        <div className="text-gray-800 text-sm md:text-base">
          {feedbacks.length > 0 ? (
            <>
              <p className="font-medium">
                Objeção mais clicada:{" "}
                <span className="text-blue-600 font-bold">{getMostClicked()}</span>
              </p>
              <p className="text-xs text-gray-500">
                Total de feedbacks coletados: {feedbacks.length}
              </p>
            </>
          ) : (
            <p>Nenhuma objeção clicada ainda</p>
          )}
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={() => console.log("Exportar feedbacks", feedbacks)}>
            Exportar Feedback
          </Button>
          <Button variant="outline" onClick={() => setShowPanel((v) => !v)}>
            {showPanel ? "Ocultar Painel" : "Mostrar Painel"}
          </Button>
        </div>
      </div>

      {/* Campo de pesquisa */}
      <Input
        placeholder="Pesquisar objeção..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />

      {/* Conteúdo principal em grid flexível */}
      <div className="flex flex-col xl:flex-row gap-6">
        {/* Lista de objeções */}
        <div className="w-full xl:flex-1">
          <div className="bg-white p-4 rounded-2xl shadow space-y-3">
            <h2 className="text-lg font-bold">Objeções</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filtered.map((obj) => (
                <Card
                  key={obj.id}
                  className="cursor-pointer hover:bg-gray-50 transition"
                  onClick={() => setSelectedObjection(obj)}
                >
                  <CardContent className="p-4 font-semibold">{obj.title}</CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Painel de feedback */}
        {showPanel && (
          <div className="w-full xl:w-[400px] flex-shrink-0">
            <div className="bg-white p-4 rounded-2xl shadow space-y-4">
              <h2 className="text-lg font-bold">Painel de Feedback</h2>
              {selectedObjection ? (
                <div className="space-y-3">
                  {selectedObjection.responses.map((resp, idx) => (
                    <div
                      key={idx}
                      className="border rounded-xl p-4 flex justify-between items-center gap-4 hover:shadow transition-all"
                    >
                      <span className="text-sm text-gray-700 break-words whitespace-pre-wrap max-w-[75%]">
                        {resp}
                      </span>
                      <div className="flex gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-green-600 hover:bg-green-100"
                          onClick={() =>
                            handleFeedback(selectedObjection.id, idx, "positive")
                          }
                        >
                          <ThumbsUp size={18} />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-red-600 hover:bg-red-100"
                          onClick={() =>
                            handleFeedback(selectedObjection.id, idx, "negative")
                          }
                        >
                          <ThumbsDown size={18} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  Selecione uma objeção para ver as respostas.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
