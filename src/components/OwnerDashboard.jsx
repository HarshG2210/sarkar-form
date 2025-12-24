import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ownerLogout } from "../redux/slices/ownerAuthSlice";
import { fetchFormsRequest } from "../redux/slices/formSlice";
import { deleteFormRequest } from "../redux/slices/formSlice";

const PAGE_SIZE = 5;

export default function OwnerDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { forms, loading } = useSelector((s) => s.form);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchFormsRequest());
  }, [dispatch]);

  /* ---------- PAGINATION LOGIC ---------- */

  const totalPages = Math.ceil(forms.length / PAGE_SIZE);

  const paginatedForms = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return forms.slice(start, start + PAGE_SIZE);
  }, [forms, page]);
  const goFirst = () => setPage(1);
  const goLast = () => setPage(totalPages);
  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));

  /* ---------- LOGOUT ---------- */

  const handleLogout = () => {
    dispatch(ownerLogout());
    navigate("/owner-login");
  };

  /* ---------- DELETE ---------- */
  const handleDeleteOne = (id) => {
    if (!window.confirm("Delete this form?")) return;
    dispatch(deleteFormRequest(id));
  };

  return (
    <div style={styles.page}>
      {/* ================= HEADER ================= */}
      <div style={styles.header}>
        <h2 style={styles.title}>📋 Owner Dashboard</h2>

        <div style={{ display: "flex", gap: "0.6rem" }}>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            ⎋ Logout
          </button>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div style={styles.card}>
        <h3 style={styles.subtitle}>🗂 Uploaded Forms</h3>

        {/* ---------- LOADER ---------- */}
        {loading && (
          <div style={styles.loaderWrap}>
            <div style={styles.loader} />
            <p>Loading forms…</p>
          </div>
        )}

        {/* ---------- EMPTY ---------- */}
        {!loading && forms.length === 0 && (
          <p style={styles.empty}>No forms uploaded yet.</p>
        )}

        {/* ---------- TABLE ---------- */}
        {!loading && forms.length > 0 && (
          <>
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={thStyle}>#</th>

                    <th style={thStyle}>
                      Entry No <br />
                      <span style={styles.marathi}>（दाखला क्रमांक）</span>
                    </th>

                    <th style={thStyle}>
                      Entry Name <br />
                      <span style={styles.marathi}>（दाखल्याचे नाव）</span>
                    </th>
                    <th style={thStyle}>
                      Applicant <br />
                      <span style={styles.marathi}>
                        （दाखला मागणी केलेल्या व्यक्तीचे नाव）
                      </span>
                    </th>
                    <th style={thStyle}>
                      Gramsevak <br />
                      <span style={styles.marathi}>（ग्रामसेवकांचे नाव）</span>
                    </th>
                    <th style={thStyle}>
                      Gram Panchayat <br />
                      <span style={styles.marathi}>（ग्रामपंचायत）</span>
                    </th>
                    <th style={thStyle}>
                      Taluka <br />
                      <span style={styles.marathi}>（तालुका）</span>
                    </th>
                    <th style={thStyle}>
                      District <br />
                      <span style={styles.marathi}>（जिल्हा）</span>
                    </th>
                    <th style={thStyle}>
                      Date <br />
                      <span style={styles.marathi}>（दाखला वितरण दिनांक）</span>
                    </th>
                    <th style={thStyle}>QR</th>
                    <th style={thStyle}>Delete</th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedForms.map((f, i) => (
                    <tr key={f.id}>
                      <td style={tdStyle}>{(page - 1) * PAGE_SIZE + i + 1}</td>
                      <td style={tdStyle}>{f.entry_no}</td>
                      <td style={tdStyle}>{f.entry_name}</td>
                      <td style={tdStyle}>{f.applicant_name}</td>
                      <td style={tdStyle}>{f.gramsevak_name}</td>
                      <td style={tdStyle}>{f.gram_panchayat}</td>
                      <td style={tdStyle}>{f.taluka}</td>
                      <td style={tdStyle}>{f.district}</td>
                      <td style={tdStyle}>{f.issue_date}</td>
                      <td style={tdStyle}>
                        <a
                          href={`${f.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={styles.qrBtn}
                        >
                          View
                        </a>
                      </td>

                      <td style={tdStyle}>
                        <button
                          onClick={() => handleDeleteOne(f.id)}
                          style={styles.deleteBtn}
                        >
                          🗑
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ================= PAGINATION ================= */}
            <div style={styles.pagination}>
              <button onClick={goFirst} disabled={page === 1}>
                ⏮ First
              </button>
              <button onClick={goPrev} disabled={page === 1}>
                ◀ Prev
              </button>

              <span style={styles.pageInfo}>
                Page <strong>{page}</strong> of <strong>{totalPages}</strong>
              </span>

              <button onClick={goNext} disabled={page === totalPages}>
                Next ▶
              </button>
              <button onClick={goLast} disabled={page === totalPages}>
                Last ⏭
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    padding: "2rem",
    fontFamily: "Inter, system-ui, sans-serif",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
    padding: "1.2rem 1.5rem",
    background: "#ffffff",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
  },

  title: {
    fontSize: "1.4rem",
    fontWeight: 700,
    color: "#000000",
  },

  logoutBtn: {
    background: "#000000",
    color: "#ffffff",
    border: "1px solid #000",
    padding: "0.55rem 1.4rem",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: 600,
  },

  card: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "1.75rem",
    border: "1px solid #e5e7eb",
  },

  subtitle: {
    marginBottom: "1.4rem",
    fontSize: "1.05rem",
    fontWeight: 600,
    color: "#000",
  },

  tableWrapper: {
    overflowX: "auto",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "0.9rem",
  },

  qrBtn: {
    background: "#000000",
    color: "#ffffff",
    padding: "0.35rem 0.9rem",
    borderRadius: "6px",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: 500,
  },

  /* ---------- PAGINATION ---------- */
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.8rem",
    marginTop: "1.5rem",
  },

  pageInfo: {
    fontSize: "0.9rem",
    color: "#000",
  },

  /* ---------- LOADER ---------- */
  loaderWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem",
  },

  loader: {
    width: "32px",
    height: "32px",
    border: "4px solid #000",
    borderTopColor: "transparent",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },

  empty: {
    padding: "1.5rem",
    color: "#555",
  },
};

/* ---------- DELETE Table ---------- */
styles.deleteBtn = {
  background: "#ffffff",
  color: "#000000",
  border: "1px solid #000",
  padding: "0.3rem 0.7rem",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "12px",
  fontWeight: 600,
};

styles.deleteAllBtn = {
  background: "#000000",
  color: "#ffffff",
  border: "1px solid #000",
  padding: "0.55rem 1.2rem",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: 600,
};

/* ---------- TABLE CELLS ---------- */
styles.table["th"] = {
  padding: "14px",
  borderBottom: "1px solid #e5e7eb",
  background: "#f9fafb",
  fontWeight: 600,
  fontSize: "0.75rem",
  textTransform: "uppercase",
  textAlign: "center",
};

styles.table["td"] = {
  padding: "12px",
  borderBottom: "1px solid #e5e7eb",
  textAlign: "center",
  color: "#000",
};

styles.marathi = {
  display: "block",
  fontSize: "0.7rem",
  fontWeight: 500,
  color: "#475569",
  marginTop: "4px",
  lineHeight: "1.2",
};

const thStyle = {
  padding: "14px",
  borderBottom: "1px solid #e5e7eb",
  background: "#f9fafb",
  fontWeight: 600,
  fontSize: "0.75rem",
  textTransform: "uppercase",
  textAlign: "center",
  verticalAlign: "middle",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #e5e7eb",
  textAlign: "center",
  verticalAlign: "middle",
  color: "#000",
};
