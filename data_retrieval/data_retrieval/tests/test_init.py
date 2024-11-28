from data_retrieval.api_connector.connect import hello_world


def test_hello_world():
    assert hello_world() == "Hello, World!"
