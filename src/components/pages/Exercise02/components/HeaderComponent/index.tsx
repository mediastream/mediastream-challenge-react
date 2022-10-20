interface Props {
  children: JSX.Element
}
const HeaderComponent = ({children}:Props) => {
  return (
    <section className={""}>
      {children}
    </section>
  )
}
export default HeaderComponent;