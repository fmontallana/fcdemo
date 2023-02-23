import React from 'react'
import DataTable from 'react-data-table-component'


const AdminTable = ({ data, columns }) => {




    return (
        <DataTable
            columns={columns}
            data={data}
            pagination
        />
    )
}

export default AdminTable