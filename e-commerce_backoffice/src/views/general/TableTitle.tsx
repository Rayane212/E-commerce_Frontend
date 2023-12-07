import React from 'react'



const TableTitle: React.FC<{list:string[]}> = ({ list }) => {
  return (
    <thead>
        <tr className='table_header'>
            {list.map((item: string) => (
                <td className="tg-ycr8 border-right">{item}</td>
            ))}
        </tr>
    </thead>
  )
}

export default TableTitle