import { useAppReady } from "mincu-hooks";
import { dataModule } from "mincu-react";
export default function App_0(){
  
  const isReady = useAppReady();
  console.log(dataModule.appData)
  console.log(isReady);


  return(
    <div>123{dataModule.appData.user.profile.name}</div>
  )
}