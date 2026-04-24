import { Link } from "react-router-dom";

const Footer = () => (
  <footer
    style={{
      background: "hsl(var(--foreground))",
      color: "hsl(var(--background))",
    }}
  >
    <div className="container-page py-16">
      <div className="grid md:grid-cols-3 gap-10">
        <div>
          <p className="font-serif text-2xl font-medium mb-3">Live Rich, Die Rich</p>
          <p className="text-sm opacity-70 mb-2">A book by Barry Brooksby.</p>
          <p className="text-xs opacity-50">© {new Date().getFullYear()} Barry Brooksby. All rights reserved.</p>
        </div>

        <div className="md:text-center">
          <ul className="space-y-2 text-sm">
            <li><Link to="/quiz" className="opacity-80 hover:opacity-100 transition-opacity">Journey Quiz</Link></li>
            <li><Link to="/blog" className="opacity-80 hover:opacity-100 transition-opacity">Field Notes</Link></li>
            <li><Link to="/tools" className="opacity-80 hover:opacity-100 transition-opacity">Tools</Link></li>
            <li><a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Contact</a></li>
            <li><a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Privacy</a></li>
            <li><a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Terms</a></li>
            <li><a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Disclosures</a></li>
          </ul>
        </div>

        <div>
          <p className="text-xs leading-relaxed opacity-60">
            Barry Brooksby is a partner at Insurance &amp; Estates LLC. This book and its associated
            resources are educational in nature and do not constitute investment, tax, or legal
            advice. Past performance does not guarantee future results. Strategy sessions are
            offered through Insurance &amp; Estates and are not a substitute for advice from a
            licensed professional.
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
