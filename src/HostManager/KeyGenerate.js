import './KeyGenerate.css';

export default function KeyGenerate() {
    const keyCode = "XYZ555";

    return (
        <form>
            <div className="new-expense_controls">
                <div className="new-expense_control">
                    <label>Generate Key</label>
                    <input type="text" value={keyCode} readOnly />
                </div>
                <div className="new-expense_actions">
                    <button type="submit">Generate Key!</button>
                </div>
            </div>
        </form>
    );
}