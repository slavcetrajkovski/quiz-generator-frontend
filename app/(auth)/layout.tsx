const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-br from-pink-300 to-blue-300 ">
      {children}
    </div>
  );
};

export default AuthLayout;
