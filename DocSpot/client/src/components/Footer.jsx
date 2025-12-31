const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-6 text-center">
        <p className="text-sm">© {new Date().getFullYear()} Book a Doctor. All rights reserved.</p>
        <p className="text-xs mt-1">Secure Healthcare Appointment Platform</p>
      </div>
    </footer>
  );
};

export default Footer;
