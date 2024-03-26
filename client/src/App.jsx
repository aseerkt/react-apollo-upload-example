import './App.css';
import Files from './components/Files';
import UploadFile from './components/UploadFile';
import logo from './logo.svg';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <h3>Apollo Upload Example</h3>
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
