interface OrderCardProps {
    id: string;
    name: string;
    orderNumber: string;
    fromLocation: string;
    toLocation: string;
    status: "pending" | "in-transit" | "delivered";
  }
  
  export const orders: OrderCardProps[] = [
    {
      id: "ord_001",
      name: "Rajesh Kumar",
      orderNumber: "IND-2024-001",
      fromLocation: "Sector 18, Noida, Uttar Pradesh 201301",
      toLocation: "Koramangala, Bengaluru, Karnataka 560034",
      status: "in-transit",
    },
    {
      id: "ord_002",
      name: "Atul Sharma",
      orderNumber: "IND-2024-002",
      fromLocation: "Connaught Place, New Delhi, Delhi 110001",
      toLocation: "Bandra West, Mumbai, Maharashtra 400050",
      status: "pending",
    },
    {
      id: "ord_003",
      name: "Amit Patel",
      orderNumber: "IND-2024-003",
      fromLocation: "Salt Lake City, Kolkata, West Bengal 700064",
      toLocation: "Jubilee Hills, Hyderabad, Telangana 500033",
      status: "delivered",
    },
    {
      id: "ord_004",
      name: "Rohan Reddy",
      orderNumber: "IND-2024-004",
      fromLocation: "MG Road, Pune, Maharashtra 411001",
      toLocation: "T Nagar, Chennai, Tamil Nadu 600017",
      status: "in-transit",
    },
    {
      id: "ord_005",
      name: "Karthik Iyer",
      orderNumber: "IND-2024-005",
      fromLocation: "Navrangpura, Ahmedabad, Gujarat 380009",
      toLocation: "Adarsh Nagar, Jaipur, Rajasthan 302004",
      status: "pending",
    },
  ];