import styled from 'styled-components';

import Header from './components/Header';
import Game from './components/Game';

/* Styles */
const DivScreen = styled.div`
	height: 100vh;
`;

/* Main */
export default function App() {
	return (
		<DivScreen className="container-fluid text-bg-dark">
			<div className="container d-flex justify-content-center">
				<Header />
			</div>
			<div className="mx-auto">
				<Game />
			</div>
		</DivScreen>
	);
}
