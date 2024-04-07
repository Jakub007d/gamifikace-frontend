interface Props {
  children?: JSX.Element | JSX.Element[];
}
function MobileBasicView({ children }: Props) {
  return (
    <div
      className="card justify-content-center text-center"
      style={{
        width: "100%",
        margin: "10px",
        maxWidth: "500px",
        minWidth: "350px",
        height: "100vh",
        minHeight: "403px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      {children}
    </div>
  );
}
export default MobileBasicView;
