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

import history from '~/services/history';

export default function ModalAdd({ filter, setFilter }) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  function handleSubmit(data) {
    setFilter(data);
    toggle();
  }

  return (
    <>
      <Button onClick={() => history.back()} className="toggle-painel">
        <i className="mdi mdi-close"></i>
      </Button>
      <Button onClick={toggle} className="toggle-config">
        <i className="mdi mdi-settings"></i>
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className="hi_bg-warning">Filtrar Pedidos</ModalHeader>
        <Form onSubmit={handleSubmit} initialData={filter}>
          <ModalBody style={{padding: '1rem'}}>
            <Row>
              <FormGroup className="col-6 m-0">
                <Label>Qtd Mínima</Label>
                <Input
                  type="text"
                  name="mim_qtd"
                  className="form-control hi_text_center"
                  defaultValue={filter.mim_qtd}
                  data-bts-button-down-class="btn btn-outline-zero"
                  data-bts-button-up-class="btn btn-outline-zero"
                />
              </FormGroup>
              <FormGroup className="col-6 m-0">
                <div className="switch">
                  <Label>
                    <Input
                      type="checkbox"
                      name="all_day"
                      defaultChecked={filter.all_day}
                    />
                    <span className="lever switch-col-light-blue"></span>Dia Inteiro?
                  </Label>
                </div>

                <Input
                  type="text"
                  name="dia"
                  className="form-control hi_bg-default hi_text_center datepicker"
                  required
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
