import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, Container } from 'reactstrap';
import CardPedido from './NewCardPedido';
import { ActionBox } from '~/components/Styled';
import api from '~/services/api';
import { getCookie } from '~/services/auxi';

export default function Dashboard() {
  const [queue, setQueue] = useState([]);
  const [cookies] = useState({
    MQTD: getCookie('LM_SALGADOS_MQTD'),
    ADAY: getCookie('LM_SALGADOS_ADAY'),
    DATA: getCookie('LM_SALGADOS_DATA'),
    EVRY: getCookie('LM_SALGADOS_EVRY'),
  });

  async function UpdateListing() {
    const { data } = await api.get(
      `/pedidos/?mqtd=${cookies.MQTD}&aday=${cookies.ADAY}&data=${cookies.DATA}`
    );
    // console.clear();
    console.debug('UpdateListing =>', data);
    setQueue(data.data.queue);
  }

  useEffect(() => {
    UpdateListing();
  }, [cookies]);

  useEffect(() => {
    const MS = cookies.EVRY ? cookies.EVRY : 0.5;
    const interval = setInterval(() => {
      UpdateListing();
    }, MS * 60 * 1000);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  // console.log(queue.map((item) => item));

  return (
    <>
      <Row xl={12}>
        {queue &&
          queue.map((item) => (
            <Col
              className="p-0 mt-1 ml-1"
              xl={{ size: 1, offset: 0 }}
              key={item.time}
            >
              <CardPedido
                update={UpdateListing}
                time={item.time}
                pedidos={item.pedidos}
              />
            </Col>
          ))}
      </Row>
    </>
  );
}
