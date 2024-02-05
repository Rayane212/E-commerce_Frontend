export default function SortList (list: any[], by: string, order: string){
    const sortedList = list.slice().sort((a: any, b: any) => {
        if (by === 'id') {
            if (order === 'asc') {
                return parseInt(a.id) - parseInt(b.id)
            } else {
                return parseInt(b.id) - parseInt(a.id)
            }
        }
        // else if (by === 'name') {
        //     if (order === 'asc') {
        //         return a.client && b.client ? a.client.localeCompare(b.client) : 0
        //     } else {
        //         return b.client && a.client ? b.client.localeCompare(a.client) : 0
        //     }
        // }
        else if (by === 'price') {
            if (order === 'asc') {
                return a.total && b.total ? parseInt(a.total) - parseInt(b.total) : 0
            } else {
                return a.total && b.total ? parseInt(b.total) - parseInt(a.total) : 0
            }
        }
        else if (by === 'date') {
            if (order === 'asc') {
                return a.date && b.date ? b.date.localeCompare(a.date) : 0
            } else {
                return a.date && b.date ? a.date.localeCompare(b.date) : 0
            }
        }
        else {
            return 0
        }
    });
    return sortedList;
}