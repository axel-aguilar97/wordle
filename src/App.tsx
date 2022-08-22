import styled from 'styled-components';

import Wordle from './components/Wordle';
import Keyboard from './components/Keyboard';

/* Styles */
const DivScreen = styled.div`
	height: 100vh;
`;

/* Main */
function App() {
	return (
		<DivScreen className="container-fluid text-bg-dark">
			<div className="container d-flex justify-content-center">
				<h1 className="m-0">Wordle</h1>
			</div>
			<div className="mx-auto">
                <div className="pb-3"><Wordle /></div>
                <div className="pb-3"><Keyboard /></div>
			</div>
		</DivScreen>
	);
}

export default App;
