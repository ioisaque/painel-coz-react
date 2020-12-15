import React, { useState } from 'react';
import {
  Col,
  Card,
  CardHeader,
  CardBody,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from 'reactstrap';
import { ActionBox } from '~/components/Styled';

import api from '~/services/api';

export default function CardPedido({ pedido, update }) {
  const [modal, setModal] = useState(false);

  let hasOBS = false;

  // eslint-disable-next-line
  pedido.items.map(function (item) {
    if (item.observacoes) hasOBS = true;
  });

  const toggle = () => setModal(!modal);

  async function saveItem(data) {
    await api.get(`setPedidoStatus.php?id_pedido=${pedido.id}&id_status=3`);

    toggle();
    update();
  }

  return (
    <>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className="hi_bg-info">
          Pedido Nº "{pedido.id}"
        </ModalHeader>
        <ModalBody>
          Deseja atualizar o status do pedido {pedido.id}?
          <br />
          <br />
          Esta ação não poderá ser desfeita através deste painel.
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggle}>
            Não
          </Button>{' '}
          <Button color="success" onClick={saveItem}>
            Sim.
          </Button>
        </ModalFooter>
      </Modal>

      <Col xs={hasOBS ? '2' : '1'} onClick={toggle}>
        <Card className="mb-4">
          <CardHeader className="hi_bg-warning">
            {pedido.id}
            <ActionBox>
              {parseInt(pedido.delivery) === 1 ? <i className="mdi mdi-motorbike"></i> : ''}
            </ActionBox>
          </CardHeader>
          <CardBody className="table-responsive slimScrollDiv p-0">
            {/* <Table>
                <tbody>
                  <tr>
                    <td className="observacoes">{pedido.observacoes}</td>
                  </tr>
                </tbody>
              </Table> */}
            <Table className="mb-0" striped>
              <tbody>
                {pedido.items.map((item) => (
                  <tr key={item.id}>
                    <td className="qtd">
                      {item.qtd}
                      <span
                        style={{
                          color: `${item.flag_color}`,
                          marginLeft: '.2rem',
                        }}
                      >
                        <i className="mdi mdi-message-alert"></i>
                      </span>
                    </td>
                    <td>
                      <pre>{item.observacoes ? item.observacoes : '...'}</pre>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    </>
  );
}
