type fn = (props: { isActive: boolean }) => string;
export default function (activeName: string, className?: string): fn {
  return (props: { isActive: boolean }) => {
    return (props.isActive ? activeName+" " :"")+ className || "";
  };
}
