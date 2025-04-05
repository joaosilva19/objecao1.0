import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

export interface Objection {
  text: string;
  responses: string[];
}

export interface Feedback {
  objection: string;
  response: string;
  result: "Positiva" | "Negativa";
}

interface FeedbackContextData {
  objections: Objection[];
  feedbacks: Feedback[];
  totalPositives: number;
  totalNegatives: number;
  mostClickedObjection: string | null;
  isPanelOpen: boolean;
  incrementObjectionClick: (text: string) => void;
  addFeedback: (
    objection: string,
    response: string,
    result: "Positiva" | "Negativa"
  ) => void;
  exportFeedbacks: () => void;
  togglePanel: () => void;
}

const FeedbackContext = createContext<FeedbackContextData | undefined>(
  undefined
);

export const FeedbackProvider = ({ children }: { children: ReactNode }) => {
  // Exemplo de objeções iniciais; adapte ao seu JSON real
  const [objections] = useState<Objection[]>([
    { text: "Preço alto", responses: ["Resposta A", "Resposta B", "Resposta C"] },
    // … mais objeções
  ]);

  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [clickCounts, setClickCounts] = useState<Record<string, number>>({});
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  const incrementObjectionClick = useCallback((text: string) => {
    setClickCounts((prev) => ({ ...prev, [text]: (prev[text] || 0) + 1 }));
  }, []);

  const addFeedback = useCallback(
    (objection: string, response: string, result: "Positiva" | "Negativa") => {
      setFeedbacks((prev) => [...prev, { objection, response, result }]);
    },
    []
  );

  const exportFeedbacks = useCallback(() => {
    const header = 'Objection,Response,Result\n';
    const rows = feedbacks
      .map((f) => `"${f.objection}","${f.response}","${f.result}"`)
      .join("\n");
    const csvContent = header + rows;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "feedbacks.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [feedbacks]);

  const totalPositives = feedbacks.filter((f) => f.result === "Positiva").length;
  const totalNegatives = feedbacks.filter((f) => f.result === "Negativa").length;
  const mostClickedObjection =
    Object.entries(clickCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || null;

  const togglePanel = useCallback(() => {
    setIsPanelOpen((prev) => !prev);
  }, []);

  return (
    <FeedbackContext.Provider
      value={{
        objections,
        feedbacks,
        totalPositives,
        totalNegatives,
        mostClickedObjection,
        isPanelOpen,
        incrementObjectionClick,
        addFeedback,
        exportFeedbacks,
        togglePanel,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedbackContext = () => {
  const ctx = useContext(FeedbackContext);
  if (!ctx)
    throw new Error("useFeedbackContext must be used within FeedbackProvider");
  return ctx;
};
