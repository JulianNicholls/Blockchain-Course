import React from "react";
import { Button, Card, CardHeader, Grid } from "semantic-ui-react";

import Layout from "../../components/Layout";
import campaignInterface from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import { Link } from "../../routes";

class ShowCampaign extends React.Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    const campaign = campaignInterface(address);
    const summary = await campaign.methods.getSummary().call();

    const {
      0: minContribution,
      1: balance,
      2: requests,
      3: contributors,
      4: manager
    } = summary;

    return {
      minContribution,
      balance,
      requests,
      contributors,
      manager,
      address
    };
  }

  renderSummary() {
    const {
      minContribution,
      balance,
      requests,
      contributors,
      manager
    } = this.props;

    const items = [
      {
        header: (
          <CardHeader title={manager}>
            {`${manager.substring(0, 22)}`}&hellip;
          </CardHeader>
        ),
        meta: "Address of Manager",
        description:
          "The manager created this campaign and can make requests to withdraw money."
      },
      {
        header: minContribution,
        meta: "Minimum Contribution in wei",
        description:
          "The minimum amount that must be contributed to the campaign to become a request approver."
      },
      {
        header: requests,
        meta: "Number of Requests",
        description:
          "A request asks to withdraw money from the campaign. Requests must be approved by the majority of contributors."
      },
      {
        header: contributors,
        meta: "Number of Contributors",
        description:
          "The number of people who have already contributed to this campaign."
      },
      {
        header: `${web3.utils.fromWei(balance, "ether")} ether`,
        meta: "Campaign Balance",
        description: "The total amount of unused contributions in the campaign."
      }
    ];

    return <Card.Group items={items} />;
  }

  render() {
    const { address } = this.props;
    const { Row, Column } = Grid;

    return (
      <Layout title="Show Campaign">
        <h2>
          Campaign Details - <small>{address}</small>
        </h2>
        <Grid>
          <Row>
            <Column width={11}>{this.renderSummary()}</Column>
            <Column width={5}>
              <ContributeForm address={address} />
            </Column>
          </Row>
          <Row>
            <Column>
              <Link route={`/campaigns/${address}/requests`}>
                <a>
                  <Button primary>Show Requests</Button>
                </a>
              </Link>
            </Column>
          </Row>
        </Grid>
      </Layout>
    );
  }
}

export default ShowCampaign;
