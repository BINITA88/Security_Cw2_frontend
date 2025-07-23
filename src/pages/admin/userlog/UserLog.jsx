// import React, { useEffect, useState } from "react";
// import { Table, Space, Spin, Alert, Button, message } from "antd";
// import { getUserActivityLogs, deleteUserApi } from "../../../apis/Api";

// const UserLog = () => {
//   const [loading, setLoading] = useState(true);
//   const [activityLogs, setActivityLogs] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchActivityLogs();
//   }, []);

//   const fetchActivityLogs = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       console.log("📦 Fetching activity logs with token:", token);

//       const response = await getUserActivityLogs({
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       console.log("✅ Activity logs fetched:", response.data.activities);
//       setActivityLogs(response.data.activities);
//     } catch (err) {
//       console.error("❌ Error fetching activity logs:", err);
//       const errorMsg =
//         err?.response?.data?.message || "Failed to fetch activity logs.";
//       setError(errorMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteUser = async (userId) => {
//     try {
//       const token = localStorage.getItem("token");
//       console.log("🗑️ Deleting user ID:", userId);

//       await deleteUserApi(userId, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setActivityLogs((prevLogs) =>
//         prevLogs.filter((log) => log.user._id !== userId)
//       );

//       message.success("User and their activities deleted successfully!");
//     } catch (error) {
//       console.error("❌ Error deleting user:", error);
//       message.error(
//         error?.response?.data?.message || "Failed to delete user."
//       );
//     }
//   };

//   const columns = [
//     {
//       title: "User",
//       dataIndex: "user",
//       key: "user",
//       render: (user) => <span>({user?.email || "N/A"})</span>,
//     },
//     {
//       title: "Action",
//       dataIndex: "action",
//       key: "action",
//     },
//     {
//       title: "IP Address",
//       dataIndex: "ipAddress",
//       key: "ipAddress",
//     },
//     {
//       title: "Timestamp",
//       dataIndex: "timestamp",
//       key: "timestamp",
//       render: (timestamp) => new Date(timestamp).toLocaleString(),
//     },
//     {
//       title: "Details",
//       dataIndex: "details",
//       key: "details",
//       render: (details) => JSON.stringify(details),
//     },
//     {
//       title: "Action",
//       key: "action-delete",
//       render: (_, record) => (
//         <Space size="middle">
//           <Button
//             type="link"
//             danger
//             onClick={() => handleDeleteUser(record.user._id)}
//           >
//             Delete
//           </Button>
//         </Space>
//       ),
//     },
//   ];

//   if (loading) {
//     return (
//       <div style={{ textAlign: "center", marginTop: "20px" }}>
//         <Spin size="large" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div style={{ margin: "20px" }}>
//         <Alert message={error} type="error" showIcon />
//       </div>
//     );
//   }

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>User Activity Logs</h1>
//       <Table
//         dataSource={activityLogs}
//         columns={columns}
//         rowKey="_id"
//         pagination={{ pageSize: 10 }}
//       />
//     </div>
//   );
// };

// export default UserLog;

import React, { useEffect, useState } from "react";
import {
  Table,
  Space,
  Spin,
  Alert,
  Button,
  message,
  Tag,
  Typography,
  Card,
} from "antd";
import { getUserActivityLogs, deleteUserApi } from "../../../apis/Api";

const { Title, Text } = Typography;

const UserLog = () => {
  const [loading, setLoading] = useState(true);
  const [activityLogs, setActivityLogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchActivityLogs();
  }, []);

  const fetchActivityLogs = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await getUserActivityLogs({
        headers: { Authorization: `Bearer ${token}` },
      });
      setActivityLogs(response.data.activities);
    } catch (err) {
      const errorMsg = err?.response?.data?.message || "Failed to fetch activity logs.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      await deleteUserApi(userId, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setActivityLogs((prevLogs) =>
        prevLogs.filter((log) => log.user._id !== userId)
      );

      message.success("User and their activities deleted successfully!");
    } catch (error) {
      message.error(error?.response?.data?.message || "Failed to delete user.");
    }
  };
// asadaaasasasasasa
  const columns = [
    {
  title: "User",
  dataIndex: "user",
  key: "user",
  render: (user) => (
    <Text strong>{user?.userName || "Grishma"}</Text>
  ),
},

    {
      title: "Severity",
      dataIndex: "severity",
      key: "severity",
      render: (level) => {
        const color =
          level === "FATAL" ? "red" : level === "WARN" ? "orange" : "green";
        return <Tag color={color}>{level}</Tag>;
      },
    },
    {
      title: "Method",
      dataIndex: "method",
      key: "method",
      render: (method) => (
        <Text code style={{ fontSize: "13px" }}>{method || "POST"}</Text>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (action) => (
        <Tag color={action === "login_success" ? "green" : "blue"}>
          {action.replace(/_/g, " ").toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "IP Address",
      dataIndex: "ipAddress",
      key: "ipAddress",
      render: (ip) => (
        <Text code style={{ fontSize: "13px" }}>{ip}</Text>
      ),
    },
    {
      title: "Timestamp",
      dataIndex: "timestamp",
      key: "timestamp",
      render: (timestamp) => (
        <Text code style={{ fontSize: "13px" }}>
          {new Date(timestamp).toLocaleString()}
        </Text>
      ),
    },
   {
  title: "Details",
  dataIndex: "details",
  key: "details",
  render: (details) => {
    if (!details) return "N/A";

    return (
      <div style={{ fontSize: "13px", lineHeight: "1.5" }}>
        {details.email && <div><strong>Email:</strong> {details.email}</div>}
        {details.userAgent && <div><strong>Agent:</strong> {details.userAgent}</div>}
        {details.device && (
          <>
            <div><strong>OS:</strong> {details.device.os}</div>
            <div><strong>Browser:</strong> {details.device.browser}</div>
            <div><strong>Platform:</strong> {details.device.platform}</div>
          </>
        )}
      </div>
    );
  },
},

    {
      title: "Action",
      key: "action-delete",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            danger
            shape="round"
            onClick={() => handleDeleteUser(record.user._id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ margin: "20px" }}>
        <Alert message={error} type="error" showIcon />
      </div>
    );
  }

  return (
    <div style={{ padding: "24px" }}>
      <Card bordered style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
        <Title level={3} style={{ marginBottom: 20 }}>
          User Activity Logs
        </Title>
        <Table
          dataSource={activityLogs}
          columns={columns}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default UserLog;



// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   Space,
//   Spin,
//   Alert,
//   Button,
//   message,
//   Tag,
//   Typography,
//   Card,
// } from "antd";
// import { getUserActivityLogs, deleteUserApi } from "../../../apis/Api";

// const { Title, Text } = Typography;

// const UserLog = () => {
//   const [loading, setLoading] = useState(true);
//   const [activityLogs, setActivityLogs] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchActivityLogs();
//   }, []);

//   const fetchActivityLogs = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       console.log("📦 Fetching activity logs with token:", token);

//       const response = await getUserActivityLogs({
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       console.log("✅ Activity logs fetched:", response.data.activities);
//       setActivityLogs(response.data.activities);
//     } catch (err) {
//       console.error("❌ Error fetching activity logs:", err);
//       const errorMsg =
//         err?.response?.data?.message || "Failed to fetch activity logs.";
//       setError(errorMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteUser = async (userId) => {
//     try {
//       const token = localStorage.getItem("token");
//       console.log("🗑️ Deleting user ID:", userId);

//       await deleteUserApi(userId, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setActivityLogs((prevLogs) =>
//         prevLogs.filter((log) => log.user._id !== userId)
//       );

//       message.success("User and their activities deleted successfully!");
//     } catch (error) {
//       console.error("❌ Error deleting user:", error);
//       message.error(
//         error?.response?.data?.message || "Failed to delete user."
//       );
//     }
//   };

//   const columns = [
//     {
//       title: "User",
//       dataIndex: "user",
//       key: "user",
//       render: (user) => <Text strong>{user?.email || "N/A"}</Text>,
//     },
//     {
//       title: "Action",
//       dataIndex: "action",
//       key: "action",
//       render: (action) => (
//         <Tag color={action === "login_success" ? "green" : "blue"}>
//           {action.replace(/_/g, " ").toUpperCase()}
//         </Tag>
//       ),
//     },
//     {
//       title: "IP Address",
//       dataIndex: "ipAddress",
//       key: "ipAddress",
//       render: (ip) => (
//         <Text code style={{ fontSize: "13px" }}>
//           {ip}
//         </Text>
//       ),
//     },
//     {
//       title: "Timestamp",
//       dataIndex: "timestamp",
//       key: "timestamp",
//       render: (timestamp) => (
//         <Text code style={{ fontSize: "13px" }}>
//           {new Date(timestamp).toLocaleString()}
//         </Text>
//       ),
//     },
//     {
//       title: "Device Info",
//       dataIndex: "details",
//       key: "device",
//       render: (details) => (
//         <>
//           <div>
//             <Text code>{details?.device?.os || "Unknown OS"}</Text>
//           </div>
//           <div>
//             <Text code>{details?.device?.browser || "Unknown Browser"}</Text>
//           </div>
//           <div>
//             <Text code>{details?.device?.platform || "Platform N/A"}</Text>
//           </div>
//         </>
//       ),
//     },
//     {
//       title: "Location",
//       dataIndex: "details",
//       key: "location",
//       render: (details) => {
//         const loc = details?.location;
//         return loc ? (
//           <Text code>
//             {loc.city || "City N/A"}, {loc.region || "Region N/A"},{" "}
//             {loc.country || "Country N/A"}
//           </Text>
//         ) : (
//           "N/A"
//         );
//       },
//     },
//     {
//       title: "User Agent",
//       dataIndex: "details",
//       key: "userAgent",
//       render: (details) => (
//         <Text code style={{ fontSize: "12px" }}>
//           {details?.userAgent || "N/A"}
//         </Text>
//       ),
//     },
//     {
//       title: "Action",
//       key: "action-delete",
//       render: (_, record) => (
//         <Space size="middle">
//           <Button
//             type="primary"
//             danger
//             shape="round"
//             onClick={() => handleDeleteUser(record.user._id)}
//           >
//             Delete
//           </Button>
//         </Space>
//       ),
//     },
//   ];

//   if (loading) {
//     return (
//       <div style={{ textAlign: "center", marginTop: "50px" }}>
//         <Spin size="large" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div style={{ margin: "20px" }}>
//         <Alert message={error} type="error" showIcon />
//       </div>
//     );
//   }

//   return (
//     <div style={{ padding: "24px" }}>
//       <Card bordered style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
//         <Title level={3} style={{ marginBottom: 20 }}>
//           User Activity Logs
//         </Title>
//         <Table
//           dataSource={activityLogs}
//           columns={columns}
//           rowKey="_id"
//           pagination={{ pageSize: 10 }}
//           scroll={{ x: true }}
//         />
//       </Card>
//     </div>
//   );
// };

// export default UserLog;



// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   Space,
//   Spin,
//   Alert,
//   Button,
//   message,
//   Tag,
//   Typography,
//   Card,
// } from "antd";
// import { getUserActivityLogs, deleteUserApi } from "../../../apis/Api";

// const { Title, Text } = Typography;

// const UserLog = () => {
//   const [loading, setLoading] = useState(true);
//   const [activityLogs, setActivityLogs] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchActivityLogs();
//   }, []);

//   const fetchActivityLogs = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       console.log("📦 Fetching activity logs with token:", token);

//       const response = await getUserActivityLogs({
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       console.log("✅ Activity logs fetched:", response.data.activities);
//       setActivityLogs(response.data.activities);
//     } catch (err) {
//       console.error("❌ Error fetching activity logs:", err);
//       const errorMsg =
//         err?.response?.data?.message || "Failed to fetch activity logs.";
//       setError(errorMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteUser = async (userId) => {
//     try {
//       const token = localStorage.getItem("token");
//       console.log("🗑️ Deleting user ID:", userId);

//       await deleteUserApi(userId, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setActivityLogs((prevLogs) =>
//         prevLogs.filter((log) => log.user._id !== userId)
//       );

//       message.success("User and their activities deleted successfully!");
//     } catch (error) {
//       console.error("❌ Error deleting user:", error);
//       message.error(
//         error?.response?.data?.message || "Failed to delete user."
//       );
//     }
//   };

//   const columns = [
//     {
//       title: "User",
//       dataIndex: "user",
//       key: "user",
//       render: (user) => (
//         <div>
//           <Text strong>{user?.userName || "N/A"}</Text>
//           <br />
//           <Text type="secondary">{user?.email || "N/A"}</Text>
//         </div>
//       ),
//     },
//     {
//       title: "Action",
//       dataIndex: "action",
//       key: "action",
//       render: (action) => (
//         <Tag color={action === "login_success" ? "green" : "blue"}>
//           {action.replace(/_/g, " ").toUpperCase()}
//         </Tag>
//       ),
//     },
//     {
//       title: "IP Address",
//       dataIndex: "ipAddress",
//       key: "ipAddress",
//       render: (ip) => (
//         <Text code style={{ fontSize: "13px" }}>
//           {ip}
//         </Text>
//       ),
//     },
//     {
//       title: "Timestamp",
//       dataIndex: "timestamp",
//       key: "timestamp",
//       render: (timestamp) => (
//         <Text code style={{ fontSize: "13px" }}>
//           {new Date(timestamp).toLocaleString()}
//         </Text>
//       ),
//     },
//     {
//       title: "Device Info",
//       dataIndex: "details",
//       key: "device",
//       render: (details) => (
//         <>
//           <div>
//             <Text code>{details?.device?.os || "Unknown OS"}</Text>
//           </div>
//           <div>
//             <Text code>{details?.device?.browser || "Unknown Browser"}</Text>
//           </div>
//           <div>
//             <Text code>{details?.device?.platform || "Unknown Platform"}</Text>
//           </div>
//         </>
//       ),
//     },
//     {
//       title: "Location",
//       dataIndex: "details",
//       key: "location",
//       render: (details) => {
//         const loc = details?.location;
//         return loc ? (
//           <Text code>
//             {loc.city || "City N/A"}, {loc.region || "Region N/A"},{" "}
//             {loc.country || "Country N/A"}
//           </Text>
//         ) : (
//           "N/A"
//         );
//       },
//     },
//     {
//       title: "User Agent",
//       dataIndex: "details",
//       key: "userAgent",
//       render: (details) => (
//         <Text code style={{ fontSize: "12px" }}>
//           {details?.userAgent || "N/A"}
//         </Text>
//       ),
//     },
//     {
//       title: "Action",
//       key: "action-delete",
//       render: (_, record) => (
//         <Space size="middle">
//           <Button
//             type="primary"
//             danger
//             shape="round"
//             onClick={() => handleDeleteUser(record.user._id)}
//           >
//             Delete
//           </Button>
//         </Space>
//       ),
//     },
//   ];

//   if (loading) {
//     return (
//       <div style={{ textAlign: "center", marginTop: "50px" }}>
//         <Spin size="large" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div style={{ margin: "20px" }}>
//         <Alert message={error} type="error" showIcon />
//       </div>
//     );
//   }

//   return (
//     <div style={{ padding: "24px" }}>
//       <Card bordered style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
//         <Title level={3} style={{ marginBottom: 20 }}>
//           User Activity Logs
//         </Title>
//         <Table
//           dataSource={activityLogs}
//           columns={columns}
//           rowKey="_id"
//           pagination={{ pageSize: 10 }}
//           scroll={{ x: true }}
//         />
//       </Card>
//     </div>
//   );
// };

// export default UserLog;
