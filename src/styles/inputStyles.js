const inputBase = {
  width: "100%", border: "1px solid var(--border)",
  fontSize: "14px", fontFamily: "var(--font-sans)", outline: "none", boxSizing: "border-box",
};

const labelBase = {
  fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase",
  color: "var(--gray)", display: "block",
};

export const authInputStyle   = { ...inputBase, padding: "12px 14px" };
export const authLabelStyle   = { ...labelBase, marginBottom: "6px" };

export const formInputStyle   = { ...inputBase, padding: "10px 14px" };
export const formLabelStyle   = { ...labelBase, fontSize: "12px", marginBottom: "6px" };

export const adminInputStyle  = { ...inputBase, padding: "8px 12px" };
export const adminLabelStyle  = { ...labelBase, marginBottom: "4px" };
export const adminErrorStyle  = { fontSize: "11px", color: "#c0392b", marginTop: "4px", display: "block" };

export const profileInputStyle = { ...inputBase, padding: "10px 12px" };
export const profileLabelStyle = { ...labelBase, letterSpacing: "1.5px", marginBottom: "6px" };
