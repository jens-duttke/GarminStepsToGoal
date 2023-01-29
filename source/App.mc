import Toybox.Application;
import Toybox.Lang;
import Toybox.WatchUi;

class App extends Application.AppBase {
	function initialize() {
		AppBase.initialize();
	}

	function getInitialView() as Lang.Array<WatchUi.Views or WatchUi.InputDelegates>? {
		return [new DataField()] as Lang.Array<WatchUi.Views>;
	}
}
