import FooterNewsletter from "./FooterNewsletter";
import FooterLinks from "./FooterLinks";
import FooterContacto from "./FooterContacto";
import FooterCopyright from "./FooterCopyright";

const Footer = () => (
  <footer style={{ borderTop: "1px solid var(--border)", marginTop: "auto" }}>
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "60px 40px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "48px" }}>
      <FooterNewsletter />
      <FooterLinks />
      <FooterContacto />
    </div>
    <FooterCopyright />
  </footer>
);

export default Footer;
