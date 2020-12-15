import React, { useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Label,
  Row,
} from 'reactstrap';
import { Form, Input } from '@rocketseat/unform';

export default function ModalAdd({ filter, setFilter }) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  function handleSubmit(data) {
    setFilter(data);
    toggle();
  }

  return (
    <>
      <Button onClick={toggle} className="toggle-config">
        <i className="mdi mdi-settings"></i>
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className="hi_bg-info">Filtrar Pedidos</ModalHeader>
        <Form onSubmit={handleSubmit}>
          <ModalBody>
            <Row>
              <FormGroup className="col-6">
                <Input
                  type="date"
                  name="day"
                  className="form-control"
                  required
                />
              </FormGroup>
              <FormGroup className="col-6">
                <Label check>
                  <Input type="checkbox" name="all_day" defaultChecked={filter.all_day} /> Dia Inteiro?
                </Label>
              </FormGroup>
              <FormGroup className="col-12">
                <Input
                  type="number"
                  name="mim_qtd"
                  className="form-control"
                  placeholder="Qtd Mínima"
                  defaultValue={filter.mim_qtd}
                />
              </FormGroup>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="success" type="submit">
              Salvar
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
}
