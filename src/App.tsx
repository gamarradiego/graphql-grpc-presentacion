import { Deck } from 'spectacle';
import theme from './theme';
import TitleSlide from './slides/Title';
import Architecture from './slides/Architecture';
import APIOverview from './slides/APIOverview';
import REST from './slides/REST';
import GraphQLIntro from './slides/GraphQLIntro';
import GraphQLConcepts from './slides/GraphQLConcepts';
import GraphQLProsCons from './slides/GraphQLProsCons';
import GRPCIntro from './slides/GRPCIntro';
import GRPCConcepts from './slides/GRPCConcepts';
import GRPCCommunication from './slides/GRPCCommunication';
import GRPCProsCons from './slides/GRPCProsCons';
import Comparison from './slides/Comparison';
import UseCases from './slides/UseCases';
import ArchitectureBridge from './slides/ArchitectureBridge';
import IntegratedDemo from './slides/IntegratedDemo';
import Summary from './slides/Summary';
import Questions from './slides/Questions';

export default function App() {
  return (
    <Deck theme={theme} transition={{ from: { opacity: 0 }, enter: { opacity: 1 }, leave: { opacity: 0 } }}>
      <TitleSlide />
      <Architecture />
      <APIOverview />
      <REST />
      <GraphQLIntro />
      <GraphQLConcepts />
      <GraphQLProsCons />
      <GRPCIntro />
      <GRPCConcepts />
      <GRPCCommunication />
      <GRPCProsCons />
      <Comparison />
      <UseCases />
      <ArchitectureBridge />
      <IntegratedDemo />
      <Summary />
      <Questions />
    </Deck>
  );
}
