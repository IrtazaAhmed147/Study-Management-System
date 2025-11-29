// UserManagement.jsx
import React, { useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    TextField,
    MenuItem,
    Button,
    Grid,
    Divider,
    Select,

} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import UserTable from "../../components/tables/userTable";
// import UserTable from "../components/tables/userTable";

const UserPage = () => {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");
    const [sort, setSort] = useState("Newest");

    return (
        <Box sx={{ p: 4, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
                User Management
            </Typography>

            {/* ---------- Top Stats ---------- */}
            
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 4 }}>
                {[
                    { label: "Total Users", value: 120 },
                    { label: "Active Users", value: 98 },
                    { label: "Blocked Users", value: 12 },
                    { label: "New Users (24h)", value: 3 },
                ].map((item) => (
                    <Card
                        key={item.label}
                        sx={{ flex: "1 1 150px", minWidth: 120, boxShadow: 3 }}
                    >
                        <CardContent sx={{ p: 1.5 }}>
                            <Typography variant="subtitle2" sx={{ fontSize: 12, color: "#6b7280" }}>
                                {item.label}
                            </Typography>
                            <Typography variant="h6" sx={{ mt: 0.5, fontSize: 20 }}>
                                {item.value}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
            {/* ---------- Filters ---------- */}

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 1,
                    mb: 3,
                }}
            >

                 <Box sx={{ display: "flex", width: { xs: "100%", sm: "100px", md: "100px" }, }}>
                    <Typography fontWeight={'bold'} p={1}>ID: </Typography>
                    <input type="number" style={{
                        outline: "none",
                        background: "#fff",
                        border: "1px solid #2A7DE1",
                        borderRadius: "5px",
                        padding: "5px 10px",
                        width: "100%",
                        height: "34px"
                    }} />
                    
                </Box>

                <Box sx={{ display: "flex", width: { xs: "100%", sm: "25%", md: "25%" }, }}>

                    <input type="text" placeholder='Search user' style={{
                        outline: "none",
                        background: "#fff",
                        border: "1px solid #2A7DE1",
                        borderRadius: "5px",
                        padding: "5px 10px",
                        width: "100%",
                        height: "34px"
                    }} />
                    
                </Box>
                <Box sx={{ display: "flex", width: { xs: "100%", sm: "25%", md: "25%" }, }}>

                    <input type="text" placeholder='Search by email' style={{
                        outline: "none",
                        background: "#fff",
                        border: "1px solid #2A7DE1",
                        borderRadius: "5px",
                        padding: "5px 10px",
                        width: "100%",
                        height: "34px"
                    }} />
                </Box>
               
                {/* Task Type */}



                {/* Status */}
                <Select
                    sx={{
                        background: 'var(--primary-color)',
                        color: '#fff',
                        height: 40,
                        fontSize: 14,
                        borderRadius: 1,
                        flex: '1 1 150px',
                        minWidth: 120,
                    }}
                    defaultValue="Status"
                >
                    <MenuItem value="Status">Status</MenuItem>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Deactivate">Blocked</MenuItem>
                </Select>
                <Select
                    sx={{
                        background: 'var(--primary-color)',
                        color: '#fff',
                        height: 40,
                        fontSize: 14,
                        borderRadius: 1,
                        flex: '1 1 150px',
                        minWidth: 120,
                    }}
                    defaultValue="CourseOrderBy"
                >
                    <MenuItem value="CourseOrderBy">Course Order</MenuItem>
                    <MenuItem value="Ascc">Asc</MenuItem>
                    <MenuItem value="Descc">Desc</MenuItem>
                </Select>
                <Select
                    sx={{
                        background: 'var(--primary-color)',
                        color: '#fff',
                        height: 40,
                        fontSize: 14,
                        borderRadius: 1,
                        flex: '1 1 150px',
                        minWidth: 120,
                    }}
                    defaultValue="MaterialOrderBy"
                >
                    <MenuItem value="MaterialOrderBy">Materials Order</MenuItem>
                    <MenuItem value="Asc">Asc</MenuItem>
                    <MenuItem value="Desc">Desc</MenuItem>
                </Select>

                {/* Course */}


                {/* Due Date */}
                <TextField
                    type="date"
                    variant="outlined"
                    size="small"
                    sx={{
                        bgcolor: '#fff',
                        borderRadius: 1,
                        '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                        '& .MuiInputBase-input': { height: 40, padding: '0 14px' },
                        flex: '1 1 150px',
                        minWidth: 120,
                    }}
                />
            </Box>



            {/* Divider */}
            <Divider sx={{ mb: 2 }} />

            {/* ---------- User Table ---------- */}
            <Typography variant="h6" sx={{ mb: 1 }}>
                All Users
            </Typography>
            <UserTable search={search} status={status} sort={sort} />
        </Box>
    );
};

export default UserPage;
