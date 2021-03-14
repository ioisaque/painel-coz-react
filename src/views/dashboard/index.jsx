import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader } from 'reactstrap';
import CardPedido from './CardPedido';
import { ActionBox } from '~/components/Styled';
import api from '~/services/api';
import { getCookie } from '~/services/auxi';

export default function Dashboard() {
  const [queue, setQueue] = useState([]);
  const [cookies, setCookies] = useState({
    MQTD: getCookie('LM_SALGADOS_MQTD'),
    ADAY: getCookie('LM_SALGADOS_ADAY'),
    DATA: getCookie('LM_SALGADOS_DATA'),
    EVRY: getCookie('LM_SALGADOS_EVRY'),
  });

  async function UpdateListing() {
    const { data } = await api.get(
      `/pedidos?mqtd=${cookies.MQTD}&aday=${cookies.ADAY}&data=${cookies.DATA}`
    );

    // console.clear();
    console.debug('UpdateListing =>', data);
    setQueue(data.data.queue);
  }

  useEffect(() => {
    UpdateListing();
  }, [cookies]);

  useEffect(() => {
    setInterval(UpdateListing, cookies.EVRY * 60 * 1000);
  }, []);

  return (
    <>
      {queue &&
        queue.map((item) => (
          <Row key={item.time}>
            <Col xl="12">
              <Card>
                <CardHeader className="hi_bg-danger">
                  {item.time}

                  <ActionBox>{`${item.count} Salgados`}</ActionBox>
                </CardHeader>
              </Card>
            </Col>
            {item.pedidos.map((pedido) => (
              <CardPedido
                key={pedido.id}
                pedido={pedido}
                update={UpdateListing}
              />
            ))}
          </Row>
        ))}
    </>
  );
}
