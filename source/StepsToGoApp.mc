import Toybox.Application;
import Toybox.Lang;
import Toybox.WatchUi;

class StepsToGoalApp extends Application.AppBase {
	function initialize() {
		AppBase.initialize();
	}

	function getInitialView() as Lang.Array<WatchUi.Views or WatchUi.InputDelegates>? {
		return [new StepsToGoalView()] as Lang.Array<WatchUi.Views>;
	}
}

function getApp() as StepsToGoalApp {
	return Application.getApp() as StepsToGoalApp;
}
