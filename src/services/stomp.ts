import WebSocket from 'ws';
import { Server } from 'https';

// 웹 소켓은 변수로 server를 받아 HTTP포트를 자동으로 공유합니다.
export default (server: Server) => {
  // server에 웹 소켓 서버를 연결한다.
  const wss = new WebSocket.Server({ server });

  // 서버와 클라이언트가 웹 소켓 연결을 맺을 때 connection 이벤트 발생
  wss.on('connection', (ws: WebSocket, req) => {
    //클라이언트의 IP를 알아내는 유명한 방법 중 하나
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('새로운 클라이언트 접속', ip);
    // ws는 웹 소켓 객체이다. 여기에 이벤트 리스너 3개를 붙여준다.
    // 클라이언트로 부터 메세지가 왔을 때 발생
    ws.on('message', (message: WebSocket.Data) => {
      console.log(message);
    });
    // 웹 소켓 연결 중 문제가 생겼을 때 발생
    ws.on('error', (error: Error) => {
      console.error(error);
    });
    // 클라이언트와 연결이 끊어졌을 때 발생
    ws.on('close', () => {
      console.log('클라이어너트 접속 해제', ip);
      // 메모리 누수를 위해서 setInterval clear
      clearInterval(interval);
    });
    const interval = setInterval(() => {
      if (ws.readyState === ws.OPEN) {
        //ws.send()를 통해서 message를 주고 받을 수 있다.
        ws.send('서버에서 클라이언트로 메세지를 보냅니다.');
      }
    }, 3000);
  });
};
