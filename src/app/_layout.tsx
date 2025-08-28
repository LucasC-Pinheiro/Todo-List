import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"

import "../../global.css"

export default function App() {
    return(
    <>
    <StatusBar 
    style="light" 
    translucent={true} 
    />
    
    <Stack screenOptions={{ 
        headerStyle:{
            backgroundColor:"#000"
        },
        headerTitleStyle:{
            color:"#FFF",
            fontSize:24,
            fontWeight:"bold"
        },
        headerTitleAlign:"center"  
        }}
    >
        <Stack.Screen
            name="index"
            options={{ title:"Todo List" }}
        />        
    </Stack> 
    </>
    )

}