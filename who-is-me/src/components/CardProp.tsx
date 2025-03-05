interface CardProp {
    id: number;
    imageUrl: string;
    title: string;
    isSelected: boolean;
    isZoomed: boolean;
    onClick: () => void;
  }
  
  export default CardProp;