import { Timestamp } from "firebase/firestore";

type ArrayItemProps = {
    createdAt: Timestamp
}

export const sortByDate = (array: ArrayItemProps[]) : any[]=> {
    const sorted = array.sort((a, b) => {
        // Convierte las marcas de tiempo (timestamps) en objetos Date
        const dateA = a.createdAt.toDate();
        const dateB = b.createdAt.toDate();

        // Ordena en orden descendente
        return dateB.getTime() - dateA.getTime();
      });

      return sorted;
}