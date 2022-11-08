
var localization = {
    en: {
        title: "Automated ARIMA",
        navigation: "Automated ARIMA",
        destination: "Variable to predict",
        firstObservation: "Time of first observation e.g.1: enter 1961,1 for January 1961 e.g.2: enter 1961,3 for 3nd  Quarter of 1961, e.g.3: enter 1 for a continuous series",
        frequency: "Number of observations per unit of time e.g.1: enter 12 for one observation for each month of a year, e.g. 2: enter 4 for one observation per quarter, e.g. 3: enter 1 for a  continuous series.",
        criteria: "Model criteria",
        criteria: "Model criteria",
        label1: "Plots",
        plotSeries: "Plot series",
        yaxisLabel: "Y axis label",
        mainTitle: "Main title",
        label2: "Options for fitted values",
        saveFitted: "Save fitted values",
        fittedValsDatasetName: "Specify dataset name to store fitted values",
        oriVsFitted: "Plot original vs. Fitted",
        plotResiduals: "Plot residuals",
        label3: "Predict using the model",
        predict: "Make predictions using model",
        periodToPredict: "Specify the number of intervals to predict",
        confInterval: "Specify the confidence interval in percents e.g. 95 for 95%",
        savePredictedVals: "Save predicted values",
        predictedValsDatasetName: "Specify dataset name to store predicted values",
        plotPredicted: "Plot predicted values",
        correlogram: "Generate correlogram",
        maxlag: "Enter max lag",
        Boxtest: " Ljung-Box test ",
        help: {
            title: "Automated ARIMA",
            r_help: "help(auto.arima, package=forecast)",
            body: `
            <b>Description</b></br>
Returns best ARIMA model according to either AIC, AICc or BIC value. The function conducts a search over possible model within the order constraints provided. Internally calls auto.arima in the forecast package
<br/>
<b>Usage</b>
<br/>
<code> 
BSkyRes <-BSkyAutoArima (vars, start, frequency, main , ylab, ic, plotSeries=TRUE, plotResiduals=FALSE, predict=FALSE, savePredictedVals=FALSE, plotPredictedValues=FALSE, correlogram=FALSE, dataset)
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
vars: selected variables to build an automatic arima model for.
</li>
<li>
start: Time of first observation should be entered in the format year,month or year,quarter e.g.( if your data is organized in months the 1992,1 for Jan 1992 or if your data is organized in quarters then 1992,1 refers to the first quarter of 1992.
</li>
<li>
frequency: Number of observations in unit time. Example: for monthly there are 12 observation in a year. For quarterly there are 4 observation in a year.
</li>
<li>
ic: Information criterion to be used in model selection. It must be one of "aic", "aicc" or "bic"
</li>
<li>
plotSeries: if TRUE a  time series plot will also be generated.
</li>
<li>
plotResiduals: if TRUE residuals will also be plotted.
</li>
<li>
predict: if TRUE predicted values  will also be generated.
</li>
<li>
savePredictedVals: predicted values will be saved.
</li>
<li>
PlotPredictedValues: predicted values will also be plotted.
</li>
<li>
correlogram: if TRUE a correlogram will be generated.
</li>
<li>
main: main title of the plot
</li>
<li>
ylab: title for the y axis
</li>
<li>
dataset: the name of the dataset from which the vars have been picked.
</li>
</ul>
<b>Details</b></br>
The default arguments are designed for rapid estimation of models for many time series. If you are analysing just one time series, and can afford to take some more time, it is recommended that you set stepwise=FALSE and approximation=FALSE.</br>
Non-stepwise selection can be slow, especially for seasonal data. The stepwise algorithm outlined in Hyndman & Khandakar (2008) is used except that the default method for selecting seasonal differences is now based on an estimate of seasonal strength (Wang, Smith & Hyndman, 2006) rather than the Canova-Hansen test. There are also some other minor variations to the algorithm described in Hyndman and Khandakar (2008).</br>
<b>Value</b><br/>
A list of class "Arima" with components:<br/>
coef: a vector of AR, MA and regression coefficients, which can be extracted by the coef method.<br/>
sigma2: the MLE of the innovations variance.<br/>
var.coef: the estimated variance matrix of the coefficients coef, which can be extracted by the vcov method.<br/>
loglik: the maximized log-likelihood (of the differenced data), or the approximation to it used.<br/>
arma: A compact form of the specification, as a vector giving the number of AR, MA, seasonal AR and seasonal MA coefficients, plus the period and the number of non-seasonal and seasonal differences.<br/>
aic: the AIC value corresponding to the log-likelihood. Only valid for method = "ML" fits.<br/>
residuals: the fitted innovations.<br/>
series: the name of the series x.<br/>
code: the convergence value returned by optim.<br/>
n.cond	:the number of initial observations not used in the fitting.<br/>
nobs: the number of “used” observations for the fitting, can also be extracted via nobs() and is used by BIC.<br/>
model: A list representing the Kalman Filter used in the fitting. See KalmanLike.<br/>
<b>Package</b></br>
forecast</br>
<b>Help</b></br>
For detailed help click on the R icon on the top right hand side of this dialog overlay or run the following command in the R syntax editor help(auto.arima, package=forecast)
			`}
    }
}

class automatedARIMA extends baseModal {
    constructor() {
        var config = {
            id: "automatedARIMA",
            label: localization.en.title,
            modalType: "two",
            RCode: `
require(forecast)
BSkyRes <-BSkyAutoArima (vars ={{selected.destination | safe}}, start =c({{selected.firstObservation | safe}}), frequency={{selected.frequency | safe}} , main ="{{selected.mainTitle | safe}}", ylab="{{selected.yaxisLabel | safe}}",ic="{{selected.criteria | safe}}",plotSeries={{selected.plotSeries | safe}},plotResiduals ={{selected.plotResiduals | safe}},predict={{selected.predict | safe}},{{if (options.selected.periodToPredict !="")}}periodToPredict={{selected.periodToPredict | safe}},{{/if}} confInterval ={{selected.confInterval | safe}}, savePredictedVals={{selected.savePredictedVals | safe}}, predictedValsDatasetName="{{selected.predictedValsDatasetName | safe}}",plotPredictedValues={{selected.plotPredicted | safe}}, plotOriginalandForecast={{selected.oriVsFitted | safe}}, saveFitted={{selected.saveFitted | safe}},fittedValsDatasetName="{{selected.fittedValsDatasetName | safe}}",correlogram={{selected.correlogram | safe}},{{if (options.selected.maxlag != "")}}lag.max={{selected.maxlag | safe}},{{/if}}Ljung_Boxtest={{selected.Boxtest | safe}},dataset="{{dataset.name}}")
BSkyFormat(BSkyRes)
{{if (options.selected.fittedValsDatasetName != "")}}BSkyLoadRefresh(bskyDatasetName="{{selected.fittedValsDatasetName | safe}}")\n{{/if}}
{{if (options.selected.predictedValsDatasetName != "")}}BSkyLoadRefresh(bskyDatasetName="{{selected.predictedValsDatasetName | safe}}"){{/if}}
`
        };
        var objects = {
            content_var: { el: new srcVariableList(config) },
            destination: {
                el: new dstVariable(config, {
                    label: localization.en.destination,
                    no: "destination",
                    required:true,
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                }), r: ['{{ var | safe}}']
            },
            firstObservation: {
                el: new input(config, {
                    no: 'firstObservation',
                    required: true,
                    allow_spaces:true,
                    label: localization.en.firstObservation,
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            frequency: {
                el: new input(config, {
                    no: 'frequency',
                    allow_spaces:true,
                    type: "numeric",
                    label: localization.en.frequency,
                    placeholder: "",
                    required: true,
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            criteria: {
                el: new comboBox(config, {
                    no: 'criteria',
                    label: localization.en.criteria,
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    required: true,
                    options: ["bic", "aic", "aicc",],
                    default: "bic"
                })
            },
            label1: { el: new labelVar(config, { label: localization.en.label1, h: 5 }) },
            plotSeries: { el: new checkbox(config, { label: localization.en.plotSeries, no: "plotSeries", extraction: "Boolean", required: true }) },
            yaxisLabel: {
                el: new input(config, {
                    no: 'yaxisLabel',
                    label: localization.en.yaxisLabel,
                    placeholder: "",
                    allow_spaces:true,
                    type: "character",
                    ml: 4,
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            mainTitle: {
                el: new input(config, {
                    no: 'mainTitle',
                    label: localization.en.mainTitle,
                    allow_spaces:true,
                    type: "character",
                    placeholder: "",
                    style: "ml-4 mb-2",
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            label2: { el: new labelVar(config, { label: localization.en.label2, h: 5 }) },
            saveFitted: { el: new checkbox(config, { label: localization.en.saveFitted, no: "saveFitted", extraction: "Boolean", ml: 4, required: true, dependant_objects: ['fittedValsDatasetName'] }) },
            fittedValsDatasetName: {
                el: new input(config, {
                    no: 'fittedValsDatasetName',
                    label: localization.en.fittedValsDatasetName,
                    placeholder: "",
                    extraction: "TextAsIs",
                    type: "character",
                    style: "ml-4 mb-2",
                    value: ""
                })
            },
            oriVsFitted: { el: new checkbox(config, { label: localization.en.oriVsFitted, no: "oriVsFitted", newline: true, extraction: "Boolean" }) },
            plotResiduals: { el: new checkbox(config, { label: localization.en.plotResiduals, no: "plotResiduals", newline: true, extraction: "Boolean" }) },
            label3: { el: new labelVar(config, { label: localization.en.label3, h: 5, style: "mt-3" }) },
            predict: { el: new checkbox(config, { label: localization.en.predict, no: "predict", extraction: "Boolean", dependant_objects: ['periodToPredict', 'savePredictedVals', 'plotPredicted', 'correlogram'] }) },
            periodToPredict: {
                el: new inputSpinner(config, {
                    no: 'periodToPredict',
                    label: localization.en.periodToPredict,
                    min: 1,
                    max: 9999999,
                    step: 1,
                    style: "ml-5 mb-2",
                    value: 1,
                    extraction: "NoPrefix|UseComma"
                })
            },
            confInterval: {
                el: new advancedSlider(config, {
                    no: "confInterval",
                    label: localization.en.confInterval,
                    min: 0,
                    max: 100,
                    step: 5,
                    style: "ml-1",
                    value: 95,
                    extraction: "NoPrefix|UseComma"
                })
            },
            savePredictedVals: { el: new checkbox(config, { label: localization.en.savePredictedVals, no: "savePredictedVals", required: true, extraction: "Boolean", dependant_objects: ['predictedValsDatasetName'] }) },
            predictedValsDatasetName: {
                el: new input(config, {
                    no: 'predictedValsDatasetName',
                    label: localization.en.predictedValsDatasetName,
                    placeholder: "",
                    style: "ml-4 mb-2",
                    type: "character",
                    extraction: "TextAsIs",
                })
            },
            plotPredicted: { el: new checkbox(config, { label: localization.en.plotPredicted, no: "plotPredicted", extraction: "Boolean", newline: true }) },
            correlogram: { el: new checkbox(config, { label: localization.en.correlogram, no: "correlogram", newline: true, extraction: "Boolean", dependant_objects: ['maxlag', 'Boxtest'] }) },
            maxlag: {
                el: new inputSpinner(config, {
                    no: 'maxlag',
                    label: localization.en.maxlag,
                    min: 1,
                    max: 9999999,
                    step: 1,
                    value: 1,
                    ml: 1,
                    extraction: "NoPrefix|UseComma"
                })
            },
            Boxtest: { el: new checkbox(config, { label: localization.en.Boxtest, no: "Boxtest", extraction: "Boolean", style: "ml-3" }) },
        };
        var arimaOptions = {
            el: new optionsVar(config, {
                no: "plots",
                name: "Advanced",
                content: [
                    objects.label2.el,
                    objects.saveFitted.el,
                    objects.fittedValsDatasetName.el,
                    objects.oriVsFitted.el,
                    objects.plotResiduals.el,
                    objects.label3.el,
                    objects.predict.el,
                    objects.periodToPredict.el,
                    objects.confInterval.el,
                    objects.savePredictedVals.el,
                    objects.predictedValsDatasetName.el,
                    objects.plotPredicted.el,
                    objects.correlogram.el,
                    objects.maxlag.el,
                    objects.Boxtest.el,
                ]
            })
        };
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.destination.el.content, objects.firstObservation.el.content, objects.frequency.el.content, objects.criteria.el.content, objects.label1.el.content, objects.plotSeries.el.content, objects.yaxisLabel.el.content, objects.mainTitle.el.content],
            bottom: [arimaOptions.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-ar",
                modal: config.id
            }
        };
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new automatedARIMA().render()