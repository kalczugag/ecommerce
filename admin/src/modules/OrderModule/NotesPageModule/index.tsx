import { DragDropProvider } from "@dnd-kit/react";
import { useGetNotesByOrderIdQuery, useReorderNotesMutation } from "@/store";
import { useHandleMutation } from "@/hooks/useHandleMutation";
import DetailCard from "@/components/DetailCard";
import NotFound from "@/components/NotFound";
import Column from "./components/Column";
import Item from "./components/Item";
import type { Order } from "@/types/Order";
import "./styles.css";

interface NotesPageProps {
    data: Order;
}

const NotesPage = ({ data }: NotesPageProps) => {
    const { handleMutation } = useHandleMutation();
    const [reorderNote] = useReorderNotesMutation();
    const {
        data: notesData,
        isLoading: isNotesLoading,
        isError,
    } = useGetNotesByOrderIdQuery(data._id || "");

    if (isError || (!isNotesLoading && !notesData?.result)) return <NotFound />;

    const sections: { [key: string]: string[] } = {
        Payments:
            notesData?.result.payments.flatMap((p) =>
                p.notes.map((n) => n._id)
            ) || [],
        Shipments:
            notesData?.result.shipments.flatMap((s) =>
                s.notes.map((n) => n._id)
            ) || [],
        // "General Notes": notesData?.result.notes.map((n) => n._id) || [],
    };

    const noteMap = new Map<string, any>();
    notesData?.result.payments.forEach((p) =>
        p.notes.forEach((n) => noteMap.set(n._id, n))
    );
    notesData?.result.shipments.forEach((s) =>
        s.notes.forEach((n) => noteMap.set(n._id, n))
    );
    // notesData?.result.notes.forEach((n) => noteMap.set(n._id, n));

    const columnOrder = Object.keys(sections);

    const belongsToMapping: Record<string, { _entity: string; model: string }> =
        {
            Payments: {
                _entity: notesData?.result.payments?.[0]?._id || "",
                model: "Payment",
            },
            Shipments: {
                _entity: notesData?.result.shipments?.[0]?._id || "",
                model: "Shipment",
            },
        };

    const handleDragEnd = async (event: any) => {
        const { source, target } = event.operation;

        if (event.canceled || source?.type === "column") return;

        const reqBody = {
            noteId: source?.id,
            newIndex: target.sortable.index,
            belongsTo: belongsToMapping[target.sortable.group],
        };

        console.log(target.sortable.index === source.sortable.initialIndex);

        if (target.sortable.index === source.sortable.initialIndex) return;

        handleMutation({
            values: reqBody,
            snackbar: false,
            mutation: reorderNote,
        });
    };

    return (
        <DetailCard label="Notes">
            <DragDropProvider onDragEnd={handleDragEnd}>
                <div className="flex flex-row flex-wrap gap-5 items-start">
                    {columnOrder.map((column) => (
                        <Column
                            key={column}
                            column={column}
                            isLoading={isNotesLoading}
                        >
                            {sections[column as keyof typeof sections].map(
                                (noteId, index) => (
                                    <Item
                                        key={noteId}
                                        item={noteMap.get(noteId)}
                                        index={index}
                                        column={column}
                                    />
                                )
                            )}
                        </Column>
                    ))}
                </div>
            </DragDropProvider>
        </DetailCard>
    );
};

export default NotesPage;
