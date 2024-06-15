
import { useEffect, useState } from "react";
import { socket } from "../socket";

export function useSocket(){
    const [isConnected, setIsConnected] = useState(false);
    const [transport, setTransport] = useState("N/A");
    const [price, setPrice] = useState<string>(
        ""
      );
  
    useEffect(() => {
      if (socket.connected) {
        onConnect();
      }
  
      function onConnect() {
        setIsConnected(true);
        setTransport(socket.io.engine.transport.name);
  
        socket.io.engine.on("upgrade", (transport) => {
          setTransport(transport.name);
        });

        socket.on("Bid", (value) => {
            // ...
            console.log("value", value);
            setPrice(value?.price);
          });
      }
  
      function onDisconnect() {
        setIsConnected(false);
        setTransport("N/A");
      }
  
      socket.on("connect", onConnect);
      socket.on("disconnect", onDisconnect);
  
      return () => {
        socket.off("connect", onConnect);
        socket.off("disconnect", onDisconnect);
      };
    }, []);

  
      
    return {isConnected,transport,price,setPrice}
  
}