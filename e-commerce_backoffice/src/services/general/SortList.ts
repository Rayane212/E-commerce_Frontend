export default function SortList (list: any[], sort_type: string, sort_order: string, sort_key:string){

    function createDateFromString(dateString: string) {
        const [day, month, year] = dateString.split('/');
        const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        return date;
    }
        
    const sortTypeNumber = (a: any, b: any, sort_order: string) => {
        return sort_order === 'asc' ? parseInt(a[sort_key as keyof typeof a]) - parseInt(b[sort_key as keyof typeof b]) : parseInt(b[sort_key as keyof typeof b]) - parseInt(a[sort_key as keyof typeof a]);
    };

    const sortTypeText = (a: any, b: any, sort_order: string) => {
        const aText = a[sort_key as keyof typeof a];
        const bText = b[sort_key as keyof typeof b];
        return sort_order === 'asc' ? aText.localeCompare(bText) : bText.localeCompare(aText);
    };
    
    
    const sortTypeDate = (a: any, b: any, sort_order: string) => {
        const aDate = sort_key ? createDateFromString(a[sort_key as keyof typeof a]) : createDateFromString(a.date);
        const bDate = sort_key ? createDateFromString(b[sort_key as keyof typeof b]) : createDateFromString(b.date);
        if (sort_order === 'asc') {
            return aDate.getTime() - bDate.getTime();
        } else {
            return bDate.getTime() - aDate.getTime();
        }
    };
    
    
    
    
    const sortFunctions: { [key: string]: Function } = {
        'id': sortTypeNumber,
        'name': sortTypeText,
        'price': sortTypeNumber,
        'total': sortTypeNumber,
        'orders': sortTypeNumber,
        'date': sortTypeDate,
        'stock': sortTypeNumber
    };
    
    const sortedList = list.slice().sort((a: any, b: any) => {
        const sortFunction = sortFunctions[sort_type];
        return sortFunction ? sortFunction(a, b, sort_order) : undefined;
    });    
    return sortedList;
}