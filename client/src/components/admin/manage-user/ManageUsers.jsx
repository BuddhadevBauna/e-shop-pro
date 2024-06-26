import "./ManageUsers.css";

const ManageUsers = () => {
    return (
        <>
            <section className="container admin admin-users-section">
                <div>
                    <h1>All Users Data</h1>
                </div>
                <div className="admin-container admin-users">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
}

export default ManageUsers;