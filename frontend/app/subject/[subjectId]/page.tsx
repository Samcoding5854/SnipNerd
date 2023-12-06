
export default function Page({
    params,
}: {
    params: { subjectId: string};
}) {
  return(
    <>
         <h1>this is  {params.subjectId}</h1>
    </>
  )
}
