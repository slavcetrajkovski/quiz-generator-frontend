const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full bg-gradient-to-br from-pink-300 to-blue-300 flex items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
