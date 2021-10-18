import logo from './logo.svg';
import UploadFile from './components/UploadFile';
import Files from './components/Files';
import './App.css';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <h1>Apollo Upload Example</h1>
      </header>
      <section>
        {/* Component which contains upload form */}
        <UploadFile />
        {/* Component which lists the links to the uploaded files */}
        <Files />
      </section>
    </div>
  );
}

export default App;
