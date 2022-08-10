import Toybox.Application;
import Toybox.Lang;
import Toybox.WatchUi;

class StepsToGoalApp extends Application.AppBase {
	function initialize() {
		AppBase.initialize();
	}

	function getInitialView() as Array<Views or InputDelegates>? {
		return [ new StepsToGoalView() ] as Array<Views or InputDelegates>;
	}
}

function getApp() as StepsToGoalApp {
	return Application.getApp() as StepsToGoalApp;
}
