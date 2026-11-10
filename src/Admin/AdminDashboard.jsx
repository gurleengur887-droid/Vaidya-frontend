import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useLocation, useNavigate } from "react-router-dom";

import {
  Search,
  RefreshCw,
  ShoppingBag,
  Clock3,
  CheckCircle2,
  CalendarDays,
  Eye,
  X,
  MapPin,
  Phone,
  Package,
  Filter,
  User,
} from "lucide-react";

import AdminSidebar from "./AdminSidebar";
import { adminLogout, getAdminToken } from "./adminApi";
const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  "https://vaidya-backend-0lhd.onrender.com";

// ========================================
// DATE HELPERS
// ========================================

const getLocalDate = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getToday = () => getLocalDate();

const formatDate = (date) => {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "";

  return parsedDate.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatGroupDate = (date) => {
  if (date === "Unknown Date") return date;

  if (date === getToday()) return "TODAY";

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (date === getLocalDate(yesterday)) return "YESTERDAY";

  return new Date(`${date}T00:00:00`)
    .toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    .toUpperCase();
};

// ========================================
// ADDRESS HELPER
// ========================================

const getAddressFields = (address = {}) => {
  if (!address || typeof address !== "object") return [];

  const fields = [
    ["House Number", address.houseNumber],
    ["Street", address.street],
    ["Area", address.area],
    ["Landmark", address.landmark],
    ["City", address.city],
    ["State", address.state],
    ["PIN Code", address.pincode],
  ];

  return fields.filter(
    ([, value]) =>
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ""
  );
};

const formatAddress = (address = {}) => {
  return getAddressFields(address)
    .map(([, value]) => value)
    .join(", ");
};

// ========================================
// API RESPONSE HELPER
// ========================================

const parseResponse = async (response) => {
  const text = await response.text();

  try {
    return text ? JSON.parse(text) : {};
  } catch {
    console.error("Non-JSON backend response:", text);

    throw new Error(
      `Backend returned an invalid response. HTTP ${response.status}.`
    );
  }
};

// ========================================
// MAIN DASHBOARD
// ========================================

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [productFilter, setProductFilter] = useState("All");

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const adminEmail =
    sessionStorage.getItem("adminEmail") || "Administrator";

  // ========================================
  // FETCH ORDERS
  // ========================================

  const fetchOrders = useCallback(
    async (showLoader = false) => {
      if (showLoader) setRefreshing(true);

      try {
        const token = getAdminToken();

        if (!token) {
          adminLogout();
          navigate("/admin", { replace: true });
          return;
        }

        const response = await fetch(
          `${API_BASE_URL}/api/admin/orders`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await parseResponse(response);

        if (response.status === 401) {
          adminLogout();
          navigate("/admin", { replace: true });
          return;
        }

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to fetch orders."
          );
        }

        const fetchedOrders = Array.isArray(data.orders)
          ? data.orders
          : [];

        setOrders(
          fetchedOrders.map((order) => ({
            ...order,
            status: order.status || "Pending",
          }))
        );

        setError("");
      } catch (err) {
        console.error("FETCH ORDERS ERROR:", err);
        setError(err.message || "Unable to load orders.");
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [navigate]
  );

  // ========================================
  // INITIAL LOAD + AUTO REFRESH
  // ========================================

  useEffect(() => {
    fetchOrders();

    const interval = setInterval(() => {
      fetchOrders();
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchOrders]);

  // ========================================
  // STATISTICS
  // ========================================

  const today = getToday();

  const stats = useMemo(() => {
    const pending = orders.filter(
      (order) => order.status === "Pending"
    );

    const completed = orders.filter(
      (order) => order.status === "Completed"
    );

    const todayOrders = orders.filter((order) => {
      if (!order.createdAt) return false;

      return (
        getLocalDate(new Date(order.createdAt)) === today
      );
    });

    return {
      total: orders.length,
      today: todayOrders.length,
      pending: pending.length,
      completed: completed.length,
    };
  }, [orders, today]);

  // ========================================
  // PRODUCT FILTER OPTIONS
  // ========================================

  const products = useMemo(() => {
    return [
      ...new Set(
        orders
          .map((order) => order.productName)
          .filter(Boolean)
      ),
    ];
  }, [orders]);

  // ========================================
  // PAGE TYPE
  // ========================================

  const pageType = location.pathname.endsWith("/pending")
    ? "Pending"
    : location.pathname.endsWith("/completed")
      ? "Completed"
      : location.pathname.endsWith("/orders")
        ? "All"
        : "Overview";

  const heading = {
    Overview: "Store Overview",
    All: "All Orders",
    Pending: "Pending Orders",
    Completed: "Completed Orders",
  }[pageType];

  // ========================================
  // FILTER ORDERS
  // ========================================

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const query = search.trim().toLowerCase();

      const address = formatAddress(order.address).toLowerCase();

      const matchesSearch =
        !query ||
        order.name?.toLowerCase().includes(query) ||
        order.phone?.includes(query) ||
        order.productName?.toLowerCase().includes(query) ||
        String(order._id).toLowerCase().includes(query) ||
        address.includes(query);

      const matchesProduct =
        productFilter === "All" ||
        order.productName === productFilter;

      const orderDate = order.createdAt
        ? getLocalDate(new Date(order.createdAt))
        : "";

      const matchesFrom =
        !fromDate || orderDate >= fromDate;

      const matchesTo =
        !toDate || orderDate <= toDate;

      const matchesStatus =
        pageType === "Overview" || pageType === "All"
          ? true
          : order.status === pageType;

      return (
        matchesSearch &&
        matchesProduct &&
        matchesFrom &&
        matchesTo &&
        matchesStatus
      );
    });
  }, [
    orders,
    search,
    productFilter,
    fromDate,
    toDate,
    pageType,
  ]);

  // ========================================
  // GROUP ORDERS DATE-WISE
  // ========================================

  const groupedOrders = useMemo(() => {
    const groups = {};

    filteredOrders.forEach((order) => {
      const date = order.createdAt
        ? getLocalDate(new Date(order.createdAt))
        : "Unknown Date";

      if (!groups[date]) {
        groups[date] = [];
      }

      groups[date].push(order);
    });

    return Object.entries(groups).sort(
      ([dateA], [dateB]) => {
        if (dateA === "Unknown Date") return 1;
        if (dateB === "Unknown Date") return -1;

        return dateB.localeCompare(dateA);
      }
    );
  }, [filteredOrders]);

  // ========================================
  // OPTIONAL TABLE COLUMNS
  // ========================================

  const showAmountColumn = filteredOrders.some(
    (order) =>
      order.price !== undefined &&
      order.price !== null
  );

  const showPacksColumn = filteredOrders.some(
    (order) =>
      order.packs !== undefined &&
      order.packs !== null
  );

  const showBoxesPerPackColumn = filteredOrders.some(
    (order) =>
      order.boxesPerPack !== undefined &&
      order.boxesPerPack !== null
  );

  const showQuantityColumn = filteredOrders.some(
    (order) =>
      order.quantity !== undefined &&
      order.quantity !== null
  );

  const tableColumnCount =
    6 +
    Number(showAmountColumn) +
    Number(showPacksColumn || showBoxesPerPackColumn || showQuantityColumn);

  // ========================================
  // UPDATE ORDER STATUS
  // ========================================

  const updateStatus = async (orderId, status) => {
    try {
      setUpdatingId(orderId);

      const response = await fetch(
        `${API_BASE_URL}/api/admin/orders/${orderId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAdminToken()}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await parseResponse(response);

      if (response.status === 401) {
        adminLogout();
        navigate("/admin", { replace: true });
        return;
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to update order status."
        );
      }

      setOrders((previousOrders) =>
        previousOrders.map((order) =>
          order._id === orderId
            ? {
                ...order,
                status: data.order.status,
              }
            : order
        )
      );

      setSelectedOrder((previousOrder) =>
        previousOrder?._id === orderId
          ? {
              ...previousOrder,
              status: data.order.status,
            }
          : previousOrder
      );
    } catch (err) {
      console.error("UPDATE STATUS ERROR:", err);
      window.alert(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  // ========================================
  // CLEAR FILTERS
  // ========================================

  const clearFilters = () => {
    setSearch("");
    setProductFilter("All");
    setFromDate("");
    setToDate("");
  };

  // ========================================
  // RENDER DASHBOARD
  // ========================================

  return (
    <div className="admin-dashboard-layout">

      <AdminSidebar />

      <main className="admin-main-content">

        {/* TOP BAR */}

        <header className="admin-topbar">

          <div>
            <span className="admin-topbar-label">
              VAIDYA CARE / ADMIN
            </span>

            <h2>{heading}</h2>
          </div>

          <div className="admin-topbar-right">

            <div className="admin-live-indicator">
              <span />
              LIVE SYNC
            </div>

            <div className="admin-profile">

              <div className="admin-avatar">
                A
              </div>

              <div>
                <strong>Administrator</strong>
                <small>{adminEmail}</small>
              </div>

            </div>

          </div>

        </header>

        <div className="admin-content-area">

          {/* REFRESH */}

          <div className="admin-dashboard-actions">

            <button
              className="admin-refresh-button"
              onClick={() => fetchOrders(true)}
              disabled={refreshing}
            >
              <RefreshCw
                size={16}
                className={refreshing ? "admin-spin" : ""}
              />

              {refreshing ? "Refreshing..." : "Refresh Orders"}
            </button>

          </div>

          {/* STATISTICS */}

          <section className="admin-stats-grid">

            <StatCard
              title="Total Orders"
              value={stats.total}
              icon={ShoppingBag}
              color="blue"
              subtitle="All orders received"
            />

            <StatCard
              title="Today's Orders"
              value={stats.today}
              icon={CalendarDays}
              color="purple"
              subtitle="Orders received today"
            />

            <StatCard
              title="Pending Orders"
              value={stats.pending}
              icon={Clock3}
              color="orange"
              subtitle="Awaiting processing"
            />

            <StatCard
              title="Completed Orders"
              value={stats.completed}
              icon={CheckCircle2}
              color="green"
              subtitle="Successfully processed"
            />

          </section>

          {/* ORDERS */}

          <section className="admin-orders-section">

            <div className="admin-section-heading">

              <div>
                <h2>
                  {pageType === "Overview"
                    ? "All Customer Orders"
                    : heading}
                </h2>

                <p>
                  View customer information and manage deliveries.
                </p>
              </div>

              <span className="admin-order-count">
                {filteredOrders.length} ORDERS
              </span>

            </div>

            {/* FILTERS */}

            <div className="admin-filters">

              <div className="admin-search-box">

                <Search size={17} />

                <input
                  type="text"
                  placeholder="Search name, phone, product, order ID or address..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

              </div>

              <div className="admin-filter-item">

                <Filter size={15} />

                <select
                  value={productFilter}
                  onChange={(e) =>
                    setProductFilter(e.target.value)
                  }
                >
                  <option value="All">All Products</option>

                  {products.map((product) => (
                    <option key={product} value={product}>
                      {product}
                    </option>
                  ))}

                </select>

              </div>

              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                aria-label="From date"
                className="admin-date-input"
              />

              <input
                type="date"
                value={toDate}
                min={fromDate || undefined}
                onChange={(e) => setToDate(e.target.value)}
                aria-label="To date"
                className="admin-date-input"
              />

              <button
                className="admin-clear-filter"
                onClick={clearFilters}
              >
                Clear
              </button>

            </div>

            {/* ERROR */}

            {error && (
              <div className="admin-error">
                {error}
              </div>
            )}

            {/* LOADING */}

            {loading ? (

              <div className="admin-empty-state">
                <RefreshCw
                  className="admin-spin"
                  size={28}
                />
                <p>Loading customer orders...</p>
              </div>

            ) : filteredOrders.length === 0 ? (

              <div className="admin-empty-state">

                <ShoppingBag size={34} />

                <h3>
                  {orders.length === 0
                    ? "No orders available"
                    : "No matching orders"}
                </h3>

                <p>
                  {orders.length === 0
                    ? "Customer orders will appear here when placed through your website."
                    : "Try changing your search or filters."}
                </p>

              </div>

            ) : (

              <div className="admin-table-wrapper">

                <table className="admin-orders-table">

                  <thead>
                    <tr>
                      <th>ORDER ID</th>
                      <th>CUSTOMER</th>
                      <th>DELIVERY ADDRESS</th>
                      <th>PRODUCT</th>

                      {(showPacksColumn ||
                        showBoxesPerPackColumn ||
                        showQuantityColumn) && (
                        <th>QUANTITY</th>
                      )}

                      {showAmountColumn && (
                        <th>AMOUNT</th>
                      )}

                      <th>DATE</th>
                      <th>STATUS</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>

                  <tbody>

                    {groupedOrders.map(
                      ([date, dateOrders]) => (

                        <React.Fragment key={date}>

                          <tr className="admin-date-group-row">

                            <td colSpan={tableColumnCount}>
                              <div className="admin-date-group-heading">

                                <div className="admin-date-group-left">
                                  <CalendarDays size={15} />

                                  <strong>
                                    {formatGroupDate(date)}
                                  </strong>
                                </div>

                                <span>
                                  {dateOrders.length} ORDERS
                                </span>

                              </div>
                            </td>

                          </tr>

                          {dateOrders.map((order) => (

                            <tr key={order._id}>

                              <td>
                                <span className="admin-order-id">
                                  #{String(order._id)
                                    .slice(-7)
                                    .toUpperCase()}
                                </span>
                              </td>

                              <td>
                                {order.name && (
                                  <strong>{order.name}</strong>
                                )}

                                {order.phone && (
                                  <small className="admin-table-subtext">
                                    <Phone size={12} />
                                    {order.phone}
                                  </small>
                                )}
                              </td>

                              <td className="admin-address-cell">
                                {formatAddress(order.address)}
                              </td>

                              <td>
                                {order.productName}
                              </td>

                              {(showPacksColumn ||
                                showBoxesPerPackColumn ||
                                showQuantityColumn) && (

                                <td>

                                  {order.packs != null && (
                                    <div>
                                      {order.packs} Packs
                                    </div>
                                  )}

                                  {order.boxesPerPack != null && (
                                    <small className="admin-table-subtext">
                                      {order.boxesPerPack} Boxes per pack
                                    </small>
                                  )}

                                  {order.quantity != null && (
                                    <small className="admin-table-subtext">
                                      Total: {order.quantity}
                                    </small>
                                  )}

                                </td>

                              )}

                              {showAmountColumn && (
                                <td className="admin-price">
                                  {order.price != null
                                    ? `₹${Number(
                                        order.price
                                      ).toLocaleString("en-IN")}`
                                    : ""}
                                </td>
                              )}

                              <td>
                                {formatDate(order.createdAt)}
                              </td>

                              <td>
                                <span
                                  className={`admin-status ${
                                    order.status.toLowerCase()
                                  }`}
                                >
                                  <span />
                                  {order.status}
                                </span>
                              </td>

                              <td>

                                <div className="admin-action-buttons">

                                  <button
                                    className="admin-view-button"
                                    onClick={() =>
                                      setSelectedOrder(order)
                                    }
                                    title="View complete order"
                                  >
                                    <Eye size={16} />
                                  </button>

                                  <button
                                    className={`admin-status-button ${
                                      order.status === "Pending"
                                        ? "complete"
                                        : "pending"
                                    }`}
                                    disabled={
                                      updatingId === order._id
                                    }
                                    onClick={() =>
                                      updateStatus(
                                        order._id,
                                        order.status === "Pending"
                                          ? "Completed"
                                          : "Pending"
                                      )
                                    }
                                  >
                                    {updatingId === order._id
                                      ? "Saving..."
                                      : order.status === "Pending"
                                        ? "Complete"
                                        : "Undo"}
                                  </button>

                                </div>

                              </td>

                            </tr>

                          ))}

                        </React.Fragment>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            )}

          </section>

        </div>

      </main>

      {/* ========================================
          ORDER DETAILS MODAL
      ======================================== */}

      {selectedOrder && (

        <div
          className="admin-modal-overlay"
          onClick={() => setSelectedOrder(null)}
        >

          <div
            className="admin-order-modal"
            onClick={(e) => e.stopPropagation()}
          >

            {/* HEADER */}

            <div className="admin-modal-header">

              <div>
                <span>COMPLETE ORDER DETAILS</span>

                <h2>
                  #{String(selectedOrder._id)
                    .slice(-7)
                    .toUpperCase()}
                </h2>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="admin-modal-close"
              >
                <X size={20} />
              </button>

            </div>

            <div className="admin-modal-body">

              {/* CUSTOMER INFORMATION */}

              {(selectedOrder.name || selectedOrder.phone) && (

                <div className="admin-detail-block">

                  <h3>
                    <User size={17} />
                    Customer Information
                  </h3>

                  {selectedOrder.name && (
                    <p>
                      <strong>Name:</strong>{" "}
                      {selectedOrder.name}
                    </p>
                  )}

                  {selectedOrder.phone && (
                    <p>
                      <Phone size={15} />
                      {selectedOrder.phone}
                    </p>
                  )}

                </div>

              )}

              {/* PRODUCT INFORMATION */}

              {(selectedOrder.productName ||
                selectedOrder.packs != null ||
                selectedOrder.boxesPerPack != null ||
                selectedOrder.quantity != null ||
                selectedOrder.price != null ||
                selectedOrder.payment) && (

                <div className="admin-detail-block">

                  <h3>
                    <Package size={17} />
                    Product Information
                  </h3>

                  {selectedOrder.productName && (
                    <p>
                      <strong>Product:</strong>{" "}
                      {selectedOrder.productName}
                    </p>
                  )}

                  {selectedOrder.packs != null && (
                    <p>
                      <strong>Number of Packs:</strong>{" "}
                      {selectedOrder.packs}
                    </p>
                  )}

                  {selectedOrder.boxesPerPack != null && (
                    <p>
                      <strong>Boxes per Pack:</strong>{" "}
                      {selectedOrder.boxesPerPack}
                    </p>
                  )}

                  {selectedOrder.quantity != null && (
                    <p>
                      <strong>Total Quantity:</strong>{" "}
                      {selectedOrder.quantity}
                    </p>
                  )}

                  {selectedOrder.price != null && (
                    <p>
                      <strong>Amount:</strong>{" "}
                      ₹{Number(
                        selectedOrder.price
                      ).toLocaleString("en-IN")}
                    </p>
                  )}

                  {selectedOrder.payment && (
                    <p>
                      <strong>Payment:</strong>{" "}
                      {selectedOrder.payment}
                    </p>
                  )}

                </div>

              )}

              {/* DELIVERY ADDRESS */}

              {getAddressFields(selectedOrder.address).length > 0 && (

                <div className="admin-detail-block">

                  <h3>
                    <MapPin size={17} />
                    Delivery Address
                  </h3>

                  {getAddressFields(selectedOrder.address).map(
                    ([label, value]) => (
                      <p key={label}>
                        <strong>{label}:</strong>{" "}
                        {value}
                      </p>
                    )
                  )}

                </div>

              )}

              {/* ORDER INFORMATION */}

              <div className="admin-detail-block">

                <h3>
                  <CalendarDays size={17} />
                  Order Information
                </h3>

                {selectedOrder._id && (
                  <p>
                    <strong>Order ID:</strong>{" "}
                    {selectedOrder._id}
                  </p>
                )}

                {selectedOrder.createdAt && (
                  <p>
                    <strong>Placed On:</strong>{" "}
                    {formatDate(selectedOrder.createdAt)}
                  </p>
                )}

                {selectedOrder.status && (
                  <p>
                    <strong>Status:</strong>{" "}
                    {selectedOrder.status}
                  </p>
                )}

              </div>

            </div>

            {/* STATUS BUTTON */}

            <button
              className="admin-modal-status-button"
              disabled={updatingId === selectedOrder._id}
              onClick={() =>
                updateStatus(
                  selectedOrder._id,
                  selectedOrder.status === "Pending"
                    ? "Completed"
                    : "Pending"
                )
              }
            >
              {updatingId === selectedOrder._id
                ? "Updating..."
                : selectedOrder.status === "Pending"
                  ? "Mark as Completed"
                  : "Move Back to Pending"}
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

// ========================================
// STATISTICS CARD
// ========================================

function StatCard({
  title,
  value,
  icon: Icon,
  color,
  subtitle,
}) {
  return (
    <div className="admin-stat-card">

      <div className={`admin-stat-icon ${color}`}>
        <Icon size={21} />
      </div>

      <p>{title}</p>

      <h2>
        {value.toLocaleString("en-IN")}
      </h2>

      <small>{subtitle}</small>

    </div>
  );
}