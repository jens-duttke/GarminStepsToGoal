import Toybox.WatchUi;

class StepsToGoalView extends WatchUi.SimpleDataField {
	function initialize () as Void {
		SimpleDataField.initialize();

		label = Application.loadResource(Rez.Strings.StepsToGoal);
	}

	function compute (info as Activity.Info) as Numeric or Duration or String or Null {
		var stepsToGoal = getStepsToGoal();

		if (stepsToGoal < 0) {
			return "+" + -stepsToGoal + " ";
		}

		return stepsToGoal;
	}

	protected function getStepsToGoal () as Numeric {
		var activityMonitorInfo = Toybox.ActivityMonitor.getInfo();

		return activityMonitorInfo.stepGoal - activityMonitorInfo.steps;
	}
}
