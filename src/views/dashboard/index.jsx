import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import {
  Row,
  Col,
  Card,
  CardHeader,
} from 'reactstrap';
import CardPedido from './CardPedido';
import { ActionBox } from '~/components/Styled';
import ConfigModal from './ConfigModal';

import api from '~/services/api';

export default function Dashboard() {
  const [cards, setCards] = useState([]);
  const [filter, setFilter] = useState({
    day: format(new Date(), 'yyyy-MM-dd'),
    all_day: true,
    mim_qtd: 50,
  });

  async function UpdateListing() {
    const { data } = await api.post('/getPedidosQueue.php', {
      day: filter.day,
      all_day: filter.all_day,
      mim_qtd: filter.mim_qtd,
    });

    setCards(data.lista);
  }

  useEffect(() => {
    console.clear()
    console.debug("Filtro Atualizado!", filter)

    UpdateListing();
    // eslint-disable-next-line
  }, [filter]);

  useEffect(() => {
    setInterval(() => {
      UpdateListing()
    }, 3 * 60 * 1000)
    console.debug("Lista Atualizada!")
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {cards && cards.map((card) => (
        <div key={card.time}>
          <Row className="mb-3">
            <Col size="12">
              <Card>
                <CardHeader className="hi_bg-danger">
                  {card.time}

                  <ActionBox>{card.count.toString().padStart(2, '0')} Pedidos</ActionBox>
                </CardHeader>
              </Card>
            </Col>
          </Row>
          <Row>
            {card.pedidos.map((pedido) => (
              <CardPedido key={pedido.id} pedido={pedido} update={UpdateListing}/>
            ))}
          </Row>
        </div>
      ))}
      <ConfigModal filter={filter} setFilter={setFilter} />
    </>
  );
}
