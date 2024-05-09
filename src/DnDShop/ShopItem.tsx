import { useDraggable } from "@dnd-kit/core";

type Props = {
    name: string,
    cost: number,
    currency: string
};

export const ShopItem = (props: Props) => {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: 'draggable' + props.name
      });
      const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      } : undefined;

    return <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
        {props.name}
    </button>;
};
